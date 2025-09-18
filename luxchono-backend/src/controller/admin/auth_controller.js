const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const UserModel = require("../../model/user_model");
const ApiError = require("../../util/error");
const transporter = require("../../util/transporter");
const { comparePassword } = require("../../util/hash");
const { createToken } = require("../../util/jwt_token");
const { VERIFY_EMAIL_ROUTE } = require("../../config/config");
const { ADMIN_ROLE, SUPER_ADMIN_ROLE, USER_ROLE } = require("../../config/string");

const EMAIL_TEMPLATE_PATH = path.join(__dirname, "../../../public/link.html");

/**
 * Helper: send verification email
 */
async function sendVerificationEmail(email, userId) {
  const htmlData = fs
    .readFileSync(EMAIL_TEMPLATE_PATH, "utf-8")
    .replace("${verificationLink}", `${VERIFY_EMAIL_ROUTE}?id=${userId}`);

  return transporter.sendMail({
    to: email,
    subject: "Verify your email",
    html: htmlData,
  });
}

/**
 * Register new admin
 */
async function register(req, res, next) {
  try {
    const { email } = req.body;

    if (await UserModel.findOne({ email })) {
      return next(new ApiError(400, "User already exists"));
    }

    const admin = new UserModel({ ...req.body, role: ADMIN_ROLE });
    await admin.save();

    await sendVerificationEmail(email, admin._id).catch((err) => {
      throw new ApiError(400, `Failed to send email: ${err.message}`);
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Verify admin email
 */
async function verifyAdminEmail(req, res, next) {
  try {
    const { id } = req.query;
    const admin = await UserModel.findById(id);

    if (!admin) {
      return next(new ApiError(400, "Invalid verification link"));
    }

    admin.isVerified = true;
    await admin.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Email verified successfully",
    });
  } catch {
    return next(new ApiError(400, "Invalid verification link"));
  }
}

/**
 * Admin login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await UserModel.findOne({
      email,
      role: { $in: [ADMIN_ROLE, SUPER_ADMIN_ROLE] },
    });

    if (!admin) return next(new ApiError(400, "Email does not exist"));
    if (!admin.isVerified) return next(new ApiError(400, "Email is not verified"));
    if (admin.role === ADMIN_ROLE && !admin.isAdminVerified) {
      return next(new ApiError(400, "Admin is not verified by super admin"));
    }

    if (!comparePassword(password, admin.password)) {
      return next(new ApiError(400, "Incorrect password"));
    }

    const token = createToken({
      _id: admin._id,
      role: admin.role,
      email: admin.email,
    });

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Login successful",
      token,
      data: { username: admin.username },
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Verify/unverify an admin by super admin
 */
async function adminVerified(req, res, next) {
  try {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      return next(new ApiError(400, "Invalid admin ID"));
    }

    const admin = await UserModel.findOne({ _id: id, role: ADMIN_ROLE });
    if (!admin) return next(new ApiError(400, "Admin does not exist"));
    if (!admin.isVerified) return next(new ApiError(400, "Admin email is not verified"));

    admin.isAdminVerified = req.body.isVerified ?? false;
    await admin.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: `${admin.username} admin ${
        admin.isAdminVerified ? "verified" : "unverified"
      } successfully`,
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Get all verified admins
 */
async function getAllAdmin(_req, res, next) {
  try {
    const admins = await UserModel.find({ role: ADMIN_ROLE, isVerified: true })
      .select("-password -isVerified -role")
      .lean();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: admins,
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

/**
 * Get all verified users
 */
async function getAllUser(_req, res, next) {
  try {
    const users = await UserModel.find({ role: USER_ROLE, isVerified: true })
      .select("-password -isVerified -role -isAdminVerified")
      .lean();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      data: users,
    });
  } catch (e) {
    return next(new ApiError(400, e.message));
  }
}

module.exports = {
  register,
  verifyAdminEmail,
  login,
  adminVerified,
  getAllAdmin,
  getAllUser,
};