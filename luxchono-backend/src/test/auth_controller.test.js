const authController = require('../controller/auth_controller');
const httpMocks = require('node-mocks-http');
const UserModel = require("../model/user_model");
const OtpModel = require("../model/otp_model");
const bcrypt = require("bcrypt");

// Mock the models
jest.mock("../model/user_model");
jest.mock("../model/otp_model");
jest.mock("../util/transporter");
jest.mock("fs");

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUserData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        phoneNo: '1234567890'
      };

      UserModel.findOne.mockResolvedValue(null);
      UserModel.prototype.save = jest.fn().mockResolvedValue(true);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/register',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.register(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        statusCode: 200,
        success: true,
        message: "Register successfully"
      });
    });

    it('should return error when user already exists', async () => {
      const mockUserData = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        phoneNo: '1234567890'
      };

      UserModel.findOne.mockResolvedValue({ email: 'test@example.com' });

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/register',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400,
        message: "User alerdy Exist"
      }));
    });
  });

  describe('login', () => {
    it('should login user successfully with correct credentials', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockUser = {
        _id: 'userId123',
        email: 'test@example.com',
        password: '$2b$10$somesaltandsomehash', // hashed password
        role: 'user'
      };

      UserModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/login',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.login(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().success).toBe(true);
      expect(res._getJSONData().token).toBeDefined();
    });

    it('should return error when email does not exist', async () => {
      const mockUserData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      UserModel.findOne.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/login',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400,
        message: "Email is not exist"
      }));
    });

    it('should return error when password is incorrect', async () => {
      const mockUserData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const mockUser = {
        email: 'test@example.com',
        password: '$2b$10$somesaltandsomehash'
      };

      UserModel.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/login',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400,
        message: "Password is wrong"
      }));
    });
  });

  describe('forgotPassword', () => {
    it('should send reset password email successfully', async () => {
      const mockUserData = {
        email: 'test@example.com'
      };

      const mockUser = {
        _id: 'userId123',
        email: 'test@example.com',
        role: 'user'
      };

      UserModel.findOne.mockResolvedValue(mockUser);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/forgot-password',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.forgotPassword(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        statusCode: 200,
        success: true,
        message: "Reset password mail send to your email"
      });
    });

    it('should return error when user does not exist', async () => {
      const mockUserData = {
        email: 'nonexistent@example.com'
      };

      UserModel.findOne.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/forgot-password',
        body: mockUserData
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await authController.forgotPassword(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400,
        message: "This email user not exist"
      }));
    });
  });
});