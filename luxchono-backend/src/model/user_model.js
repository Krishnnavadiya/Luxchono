const { Schema, model } = require("mongoose");
const { hashPassword } = require("../util/hash");
const { USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE } = require("../config/string");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: function () {
        return this.role === USER_ROLE;
      },
    },

    image: {
      type: String,
      default: null,
    },

    publicId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: [USER_ROLE, ADMIN_ROLE, SUPER_ADMIN_ROLE],
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: function () {
        return this.role !== ADMIN_ROLE; 
      },
    },

    isAdminVerified: {
      type: Boolean,
      default: function () {
        return this.role !== ADMIN_ROLE;
      },
    },
  },
  { timestamps: true }
);

// -------- PASSWORD HASHING HOOK ----------
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = model("users", userSchema);
