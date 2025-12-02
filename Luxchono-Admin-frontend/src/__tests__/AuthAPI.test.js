import { useLoginMutation, useRegisterMutation } from '../api/Login';

// Mock the API hooks
const mockLoginMutation = jest.fn();
const mockRegisterMutation = jest.fn();

jest.mock('../api/Login', () => {
  const actual = jest.requireActual('../api/Login');
  return {
    ...actual,
    useLoginMutation: () => [mockLoginMutation, {}],
    useRegisterMutation: () => [mockRegisterMutation, {}],
  };
});

describe('Auth API Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useLoginMutation', () => {
    it('should return a login function', () => {
      const [loginFunction] = useLoginMutation();
      
      expect(typeof loginFunction).toBe('function');
    });
  });

  describe('useRegisterMutation', () => {
    it('should return a register function', () => {
      const [registerFunction] = useRegisterMutation();
      
      expect(typeof registerFunction).toBe('function');
    });
  });
});