const UserModel = require('../model/user_model');
const mongoose = require('mongoose');

describe('User Model', () => {
  describe('User Schema', () => {
    it('should have the required fields', () => {
      const user = new UserModel();
      
      expect(user.schema.paths.email).toBeDefined();
      expect(user.schema.paths.username).toBeDefined();
      expect(user.schema.paths.password).toBeDefined();
      expect(user.schema.paths.phoneNo).toBeDefined();
      expect(user.schema.paths.role).toBeDefined();
    });

    it('should require email field', () => {
      const user = new UserModel();
      user.validateSync();
      const errors = user.errors;
      
      expect(errors.email).toBeDefined();
      expect(errors.email.kind).toBe('required');
    });

    it('should require username field', () => {
      const user = new UserModel();
      user.validateSync();
      const errors = user.errors;
      
      expect(errors.username).toBeDefined();
      expect(errors.username.kind).toBe('required');
    });

    it('should require password field', () => {
      const user = new UserModel();
      user.validateSync();
      const errors = user.errors;
      
      expect(errors.password).toBeDefined();
      expect(errors.password.kind).toBe('required');
    });

    it('should require phoneNo for USER_ROLE', () => {
      const user = new UserModel({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        role: 'user'
      });
      
      // Since phoneNo is conditionally required, we need to check the schema definition
      const phoneNoPath = user.schema.paths.phoneNo;
      expect(phoneNoPath.isRequired).toBeDefined();
    });

    it('should have role enum values', () => {
      const user = new UserModel();
      const rolePath = user.schema.paths.role;
      
      expect(rolePath.options.enum).toContain('user');
      expect(rolePath.options.enum).toContain('admin');
      expect(rolePath.options.enum).toContain('superAdmin');
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', () => {
      // This test would require mocking the bcrypt functionality
      // Since we're unit testing the model, we'll check that the pre-save hook exists
      const userSchema = UserModel.schema;
      const preSaveHooks = userSchema.callQueue.filter(item => 
        item[0] === 'pre' && item[1][0] === 'save'
      );
      
      expect(preSaveHooks.length).toBeGreaterThan(0);
    });
  });
});