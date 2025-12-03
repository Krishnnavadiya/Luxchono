const UserModel = require('../model/user_model');
const mockingoose = require('mockingoose');
const bcrypt = require('bcryptjs');

describe('User Model', () => {

  beforeEach(() => {
    mockingoose.resetAll(); // reset mocked DB before each test
  });

  // ------------------------------
  // SCHEMA FIELD TESTS
  // ------------------------------
  describe('User Schema', () => {

    it('should have required fields', () => {
      const user = new UserModel();
      const paths = user.schema.paths;

      expect(paths.email).toBeDefined();
      expect(paths.username).toBeDefined();
      expect(paths.password).toBeDefined();
      expect(paths.phoneNo).toBeDefined();
      expect(paths.role).toBeDefined();
    });

    it('should require email', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation.errors;

      expect(errors.email).toBeDefined();
      expect(errors.email.kind).toBe('required');
    });

    it('should require username', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation.errors;

      expect(errors.username).toBeDefined();
      expect(errors.username.kind).toBe('required');
    });

    it('should require password', () => {
      const user = new UserModel();
      const validation = user.validateSync();
      const errors = validation.errors;

      expect(errors.password).toBeDefined();
      expect(errors.password.kind).toBe('required');
    });

    it('should require phoneNo for USER role', () => {
      const user = new UserModel({
        email: 'test@example.com',
        username: 'testuser',
        password: '123456',
        role: 'user'
      });

      const validation = user.validateSync();
      const errors = validation.errors;

      expect(errors.phoneNo).toBeDefined();
      expect(errors.phoneNo.kind).toBe('required');
    });

    it('should have correct enum values for role', () => {
      const rolePath = UserModel.schema.paths.role;
      expect(rolePath.options.enum).toContain('user');
      expect(rolePath.options.enum).toContain('admin');
      expect(rolePath.options.enum).toContain('superAdmin');
    });
  });

  // ------------------------------
  // PASSWORD HASHING TEST
  // ------------------------------
  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {

      // Mock save response (prevents hitting real DB)
      mockingoose(UserModel).toReturn({ _id: '1' }, 'save');

      const user = new UserModel({
        email: 'test@example.com',
        username: 'tester',
        password: 'plaintext123',
        phoneNo: '9999999999',
        role: 'user'
      });

      // Save triggers pre-save hook
      await user.save();

      // Password should be hashed
      expect(user.password).not.toBe('plaintext123');
      expect(user.password.length).toBeGreaterThan(20);

      // Validate hash correctness
      const isValid = await bcrypt.compare('plaintext123', user.password);
      expect(isValid).toBe(true);
    });
  });

});
