
require('dotenv').config();

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserModel = require('../model/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose');

// Mock UserModel and JWT
jest.mock('../model/user_model');
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_jwt_token')
}));

// Create a minimal express app for testing
const app = express();
app.use(bodyParser.json());

// Import your auth controller
const authController = require('../controller/auth_controller');

// Define routes for testing
app.post('/register', authController.register);
app.post('/login', authController.login);


describe('Auth Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockingoose.resetAll();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      // Mock findOne to return null (no user exists)
      UserModel.findOne.mockResolvedValue(null);

      // Mock save to succeed
      UserModel.prototype.save = jest.fn().mockResolvedValue(true);

      const res = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
          phoneNo: '1234567890'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Register successfully');
    });

    it('should fail if user already exists', async () => {
      UserModel.findOne.mockResolvedValue({ email: 'test@example.com' });

      const res = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
          phoneNo: '1234567890'
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);

      // Mock findOne to return a user
      UserModel.findOne.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      });

      // Mock bcrypt compare
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.token).toBe('mocked_jwt_token');
    });

    it('should fail with wrong password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);

      UserModel.findOne.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user'
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(400);
    });

    it('should fail if email not found', async () => {
      UserModel.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/login')
        .send({ email: 'notfound@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
    });
  });

});
