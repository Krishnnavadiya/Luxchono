const CartModel = require('../model/cart_model');
const mongoose = require('mongoose');

describe('Cart Model', () => {
  describe('Cart Schema', () => {
    it('should have the required fields', () => {
      const cart = new CartModel();
      
      expect(cart.schema.paths.pid).toBeDefined();
      expect(cart.schema.paths.uid).toBeDefined();
      expect(cart.schema.paths.quantity).toBeDefined();
    });

    it('should require pid field', () => {
      const cart = new CartModel();
      cart.validateSync();
      const errors = cart.errors;
      
      expect(errors.pid).toBeDefined();
      expect(errors.pid.kind).toBe('required');
    });

    it('should require uid field', () => {
      const cart = new CartModel();
      cart.validateSync();
      const errors = cart.errors;
      
      expect(errors.uid).toBeDefined();
      expect(errors.uid.kind).toBe('required');
    });

    it('should have default quantity of 1', () => {
      const cart = new CartModel();
      
      expect(cart.quantity).toBe(1);
    });

    it('should reference Product and User models', () => {
      const cartSchema = CartModel.schema;
      
      expect(cartSchema.paths.pid.options.ref).toBe('products');
      expect(cartSchema.paths.uid.options.ref).toBe('users');
    });
  });
});