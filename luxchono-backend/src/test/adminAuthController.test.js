const { login } = require("../Admin/auth_controler");
const UserModel = require("../../model/user_model");
const { comparePassword } = require("../../util/hash");
const { createToken } = require("../../util/jwt_token");
const ApiError = require("../../util/error");
const { ADMIN_ROLE, SUPER_ADMIN_ROLE } = require("../../config/string");

jest.mock("../../model/user_model");
jest.mock("../../util/hash");
jest.mock("../../util/jwt_token");

describe("Admin Auth Controller - login", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "admin@example.com", password: "password123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it("should fail if admin not found", async () => {
    UserModel.findOne.mockResolvedValue(null);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should fail if email not verified", async () => {
    UserModel.findOne.mockResolvedValue({ isVerified: false });
    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should fail if admin not approved by super admin", async () => {
    UserModel.findOne.mockResolvedValue({
      isVerified: true,
      role: ADMIN_ROLE,
      isAdminVerified: false,
    });

    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should fail if password does not match", async () => {
    UserModel.findOne.mockResolvedValue({
      email: "admin@example.com",
      role: ADMIN_ROLE,
      isVerified: true,
      isAdminVerified: true,
      password: "hashedPass"
    });
    comparePassword.mockReturnValue(false);

    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should succeed if credentials are correct", async () => {
    const mockAdmin = {
      _id: "123",
      email: "admin@example.com",
      username: "AdminUser",
      role: ADMIN_ROLE,
      isVerified: true,
      isAdminVerified: true,
      password: "hashedPass"
    };
    UserModel.findOne.mockResolvedValue(mockAdmin);
    comparePassword.mockReturnValue(true);
    createToken.mockReturnValue("mockToken");

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        token: "mockToken",
        data: { username: "AdminUser" }
      })
    );
  });
});
