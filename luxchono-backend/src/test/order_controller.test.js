const orderController = require('../controller/order_controller');
const httpMocks = require('node-mocks-http');
const OrderModel = require("../model/order_model");
const ProductModel = require("../model/admin/product_model");
const AddressModel = require("../model/address_model");
const CartModel = require("../model/cart_model");

// Mock the models
jest.mock("../model/order_model");
jest.mock("../model/admin/product_model");
jest.mock("../model/address_model");
jest.mock("../model/cart_model");

describe('Order Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export all required functions', () => {
    expect(typeof orderController.makeOrder).toBe('function');
    expect(typeof orderController.paymentOrder).toBe('function');
    expect(typeof orderController.paymentVerification).toBe('function');
    expect(typeof orderController.getOrder).toBe('function');
    expect(typeof orderController.getAllOrder).toBe('function');
    expect(typeof orderController.cancelOrder).toBe('function');
  });

  describe('makeOrder', () => {
    it('should calculate order details correctly', async () => {
      const mockProducts = [
        { pid: 'product1', quantity: 2 },
        { pid: 'product2', quantity: 1 }
      ];
      
      const mockProductData = [
        { 
          _id: 'product1', 
          name: 'Product 1', 
          price: 100, 
          dummyPrice: 120, 
          stock: 5,
          isActive: true
        },
        { 
          _id: 'product2', 
          name: 'Product 2', 
          price: 50, 
          dummyPrice: 60, 
          stock: 3,
          isActive: true
        }
      ];

      ProductModel.aggregate.mockResolvedValue([mockProductData[0]]);
      // Mock for second product call
      ProductModel.aggregate.mockResolvedValueOnce([mockProductData[0]])
                           .mockResolvedValueOnce([mockProductData[1]]);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/make-order',
        body: mockProducts
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.makeOrder(req, res, next);

      expect(res.statusCode).toBe(200);
      const responseData = res._getJSONData();
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveProperty('orderProducts');
      expect(responseData.data).toHaveProperty('totalAmount');
      expect(responseData.data).toHaveProperty('discountAmount');
      expect(responseData.data).toHaveProperty('paymentAmount');
    });

    it('should return error when product is out of stock', async () => {
      const mockProducts = [{ pid: 'product1', quantity: 10 }];
      const mockProductData = [{
        _id: 'product1',
        name: 'Product 1',
        price: 100,
        stock: 5, // Less than requested quantity
        isActive: true
      }];

      ProductModel.aggregate.mockResolvedValue([mockProductData[0]]);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/make-order',
        body: mockProducts
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.makeOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400
      }));
    });
  });

  describe('getOrder', () => {
    it('should return order when found', async () => {
      const mockOrder = {
        _id: 'orderId123',
        orderId: 'ORD-123',
        status: 'completed'
      };

      OrderModel.aggregate.mockResolvedValue([mockOrder]);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/order',
        query: { orderId: 'orderId123' }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.getOrder(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().data).toEqual(mockOrder);
    });

    it('should return error when order not found', async () => {
      OrderModel.aggregate.mockResolvedValue([]);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/order',
        query: { orderId: 'nonexistent' }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.getOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400
      }));
    });
  });

  describe('getAllOrder', () => {
    it('should return all orders for user', async () => {
      const mockOrders = [
        { orderId: 'ORD-123', status: 'completed' },
        { orderId: 'ORD-124', status: 'pending' }
      ];

      OrderModel.aggregate.mockResolvedValue(mockOrders);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/orders',
        user: { _id: 'userId123' }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.getAllOrder(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().data).toEqual(mockOrders);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel order successfully', async () => {
      const mockOrder = {
        _id: 'orderId123',
        orderId: 'ORD-123',
        status: 'completed',
        isCancelled: false,
        save: jest.fn().mockResolvedValue(true),
        populate: jest.fn().mockReturnThis()
      };

      OrderModel.findOne.mockResolvedValue(mockOrder);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/cancel-order',
        body: { orderId: 'orderId123' },
        id: 'userId123'
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.cancelOrder(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().success).toBe(true);
    });

    it('should return error when order not found', async () => {
      OrderModel.findOne.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/cancel-order',
        body: { orderId: 'nonexistent' },
        id: 'userId123'
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await orderController.cancelOrder(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400
      }));
    });
  });
});