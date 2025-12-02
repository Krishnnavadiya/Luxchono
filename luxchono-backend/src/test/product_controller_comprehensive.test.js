const productController = require('../controller/product_controller');
const httpMocks = require('node-mocks-http');
const ProductModel = require("../model/admin/product_model");
const mongoose = require("mongoose");

// Mock the ProductModel
jest.mock("../model/admin/product_model");

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export getProducts and getOneProduct', () => {
    expect(typeof productController.getProducts).toBe('function');
    expect(typeof productController.getOneProduct).toBe('function');
  });

  describe('getProducts', () => {
    it('should return products when successful', async () => {
      const mockProducts = [{ name: 'Test Product', price: 100 }];
      ProductModel.aggregate.mockResolvedValue(mockProducts);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: {}
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual({
        statusCode: 200,
        success: true,
        data: mockProducts
      });
    });

    it('should handle category filter correctly', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: { category: ['categoryId1', 'categoryId2'] }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(ProductModel.aggregate).toHaveBeenCalled();
    });

    it('should handle brand filter correctly', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: { brand: ['brandId1', 'brandId2'] }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(ProductModel.aggregate).toHaveBeenCalled();
    });

    it('should handle price range filters', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: { startPrice: '50', endPrice: '200' }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(ProductModel.aggregate).toHaveBeenCalled();
    });

    it('should handle search query', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: { search: 'watch' }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(ProductModel.aggregate).toHaveBeenCalled();
    });

    it('should call next with error when exception occurs', async () => {
      const errorMessage = 'Database error';
      ProductModel.aggregate.mockRejectedValue(new Error(errorMessage));

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/product',
        query: {}
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        message: errorMessage
      }));
    });
  });

  describe('getOneProduct', () => {
    it('should return a single product when successful', async () => {
      const productId = '507f1f77bcf86cd799439011';
      const mockProduct = {
        _id: productId,
        name: 'Test Product',
        price: 100
      };
      
      ProductModel.aggregate.mockResolvedValue([mockProduct]);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: `/product/${productId}`,
        params: { id: productId }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getOneProduct(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().data.product).toEqual(mockProduct);
    });

    it('should return error for invalid product ID', async () => {
      const invalidId = 'invalid-id';
      
      const req = httpMocks.createRequest({
        method: 'GET',
        url: `/product/${invalidId}`,
        params: { id: invalidId }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getOneProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400
      }));
    });

    it('should return error when product not found', async () => {
      const productId = '507f1f77bcf86cd799439011';
      ProductModel.aggregate.mockResolvedValue([]);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: `/product/${productId}`,
        params: { id: productId }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getOneProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 400
      }));
    });

    it('should call next with error when exception occurs', async () => {
      const errorMessage = 'Database error';
      const productId = '507f1f77bcf86cd799439011';
      ProductModel.aggregate.mockRejectedValue(new Error(errorMessage));

      const req = httpMocks.createRequest({
        method: 'GET',
        url: `/product/${productId}`,
        params: { id: productId }
      });
      
      const res = httpMocks.createResponse();
      const next = jest.fn();

      await productController.getOneProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        message: errorMessage
      }));
    });
  });
});