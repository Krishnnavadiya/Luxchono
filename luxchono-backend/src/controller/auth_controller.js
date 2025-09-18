const fs = require("fs");
const path = require("path");
const UserModel = require("../model/user_model");
const OtpModel = require("../model/otp_model");
const NotificationModel = require("../model/notification_model");
const ApiError = require("../util/error");
const { generateOtp } = require("../util/utils");
const transporter = require("../util/transporter");
const { comparePassword } = require("../util/hash");
const { createToken } = require("../util/jwt_token");
const {
  USER_ROLE,
  PUBLIC_NOTIFICATION,
  PRIVATE_NOTIFICATION,
} = require("../config/string");
const {
  USER_RESET_PASSWORD_ROUTE,
  ADMIN_RESET_PASSWORD_ROUTE,
} = require("../config/config");

/**
 * Helper: read HTML template and replace placeholders
 */
function loadTemplate(file, replacements = {}) {
  let html = fs.readFileSync(file, "utf-8");
  Object.entries(replacements).forEach(([key, value]) => {
    html = html.replace(key, value);
  });
  return html;
}

/**
 * Helper: send email (promisified)
 */
async function sendMail({ to, subject, html }) {
  return transporter.sendMail({ to, subject, html });
}

/**
 * Send OTP for email verification
 */
async function verifyEmail(req, res, next) {
  try {
    const { email } = req.body;
    const otp = generateOtp();

    const htmlData = loadTemplate(
      path.join(__dirname, "../../public/otp.html"),
      { "${otp}": otp }
    );

    await sendMail({ to: email, subject: "Verify email", html: htmlData });

    await OtpModel.deleteMany({ email });
    const otpModel = new OtpModel({ email, otp });
    await otpModel.save();

    // Auto-expire OTP after 1 minute
    setTimeout(async () => {
      await OtpModel.findByIdAndDelete(otpModel._id);
    }, 60 * 1000);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "OTP sent to your email",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Verify OTP
 */
async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;
    const findOtp = await OtpModel.findOne({ email });

    if (!findOtp) return next(new ApiError(400, "OTP expired"));
    if (findOtp.otp !== otp) return next(new ApiError(400, "Invalid OTP"));

    await OtpModel.deleteMany({ email });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "OTP verified successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Register user
 */
async function register(req, res, next) {
  try {
    const { email } = req.body;

    if (await UserModel.findOne({ email })) {
      return next(new ApiError(400, "User already exists"));
    }

    const user = new UserModel({ ...req.body, role: USER_ROLE });
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Registered successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Login user
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return next(new ApiError(400, "Email does not exist"));
    if (!comparePassword(password, user.password)) {
      return next(new ApiError(400, "Incorrect password"));
    }

    const token = createToken({
      _id: user._id,
      role: USER_ROLE,
      email: user.email,
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      token,
      message: "Login successful",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Forgot password (send reset link)
 */
async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return next(new ApiError(400, "User not found"));

    const filePath = path.join(__dirname, "../../public/reset_password.html");
    const resetLink =
      user.role === USER_ROLE
        ? `${USER_RESET_PASSWORD_ROUTE}?id=${user._id}`
        : `${ADMIN_RESET_PASSWORD_ROUTE}?id=${user._id}`;

    const htmlData = loadTemplate(filePath, { "${resetPasswordLink}": resetLink });

    await sendMail({ to: email, subject: "Reset password", html: htmlData });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Reset password email sent",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Reset password
 */
async function resetPassword(req, res, next) {
  try {
    const { id } = req.query;
    const { newPassword } = req.body;

    if (!id) return next(new ApiError(400, "User ID is required"));
    if (!newPassword) return next(new ApiError(400, "Password is required"));

    const user = await UserModel.findById(id);
    if (!user) return next(new ApiError(400, "User not found"));

    user.password = newPassword.trim();
    await user.save({ validateBeforeSave: true });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Convert user ID to email
 */
async function idToEmail(req, res, next) {
  try {
    const { id } = req.query;

    if (!id) return next(new ApiError(400, "User ID is required"));

    const user = await UserModel.findById(id).lean();
    if (!user) return next(new ApiError(400, "User not found"));

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: { email: user.email },
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Change password (logged-in user)
 */
async function changePassword(req, res, next) {
  try {
    const { password, newPassword } = req.body;
    const user = await UserModel.findById(req.user._id);

    if (!user) return next(new ApiError(400, "User not found"));
    if (!comparePassword(password, user.password)) {
      return next(new ApiError(400, "Old password is incorrect"));
    }
    if (comparePassword(newPassword, user.password)) {
      return next(new ApiError(400, "New password must be different"));
    }

    user.password = newPassword.trim();
    await user.save({ validateBeforeSave: true });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Get user profile
 */
async function profile(req, res, next) {
  try {
    const user = await UserModel.findById(req.id)
      .select("-password -isVerified -isAdminVerified -publicId")
      .lean();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: user,
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Edit profile
 */
async function editProfile(req, res, next) {
  try {
    req.user.username = req.body.username ?? req.user.username;
    req.user.phoneNo = req.body.phoneNo ?? req.user.phoneNo;

    await req.user.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Get all notifications for user
 */
async function getAllNotification(req, res, next) {
  try {
    const filter = {
      $or: [{ type: PUBLIC_NOTIFICATION }],
    };

    if (req.id) {
      filter.$or.push({
        $and: [{ user: req.id }, { type: PRIVATE_NOTIFICATION }],
      });
    }

    const notifications = await NotificationModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Notifications fetched",
      data: notifications,
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

module.exports = {
  verifyEmail,
  verifyOtp,
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  idToEmail,
  profile,
  editProfile,
  getAllNotification,
};
