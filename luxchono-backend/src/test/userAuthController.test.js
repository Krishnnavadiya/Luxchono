const { login } = require("../controler/auth_controler");
const UserModel = require("../model/user_model");
const { comparePassword } = require("../util/hash");
const { createToken } = require("../util/jwt_token");
const ApiError = require("../util/error");

jest.mock("../model/user_model");
jest.mock("../util/hash");
jest.mock("../util/jwt_token");

describe("User Auth Controller - login", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { email: "user@example.com", password: "mypassword" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it("should fail if user not found", async () => {
    UserModel.findOne.mockResolvedValue(null);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should fail if password is wrong", async () => {
    UserModel.findOne.mockResolvedValue({ email: "user@example.com", password: "hashedPass" });
    comparePassword.mockReturnValue(false);

    await login(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(ApiError));
  });

  it("should succeed if credentials are correct", async () => {
    const mockUser = { _id: "456", email: "user@example.com", password: "hashedPass" };
    UserModel.findOne.mockResolvedValue(mockUser);
    comparePassword.mockReturnValue(true);
    createToken.mockReturnValue("mockToken");

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        token: "mockToken"
      })
    );
  });
});
