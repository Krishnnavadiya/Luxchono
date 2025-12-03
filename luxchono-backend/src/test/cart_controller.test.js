// Mock models FIRST
jest.mock("../model/cart_model");
jest.mock("../model/admin/product_model");

const cartController = require('../controller/cart_controller');
const httpMocks = require('node-mocks-http');
const CartModel = require("../model/cart_model");
const ProductModel = require("../model/admin/product_model");

beforeEach(() => {
  jest.clearAllMocks();

  // Fix constructor + save()
  CartModel.mockImplementation(function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue(true)
    };
  });
});

describe("Cart Controller", () => {
  describe("addCart", () => {
    it("should add a new item", async () => {
      CartModel.findOne.mockResolvedValue(null);
      CartModel.countDocuments.mockResolvedValue(1);

      const req = httpMocks.createRequest({
        method: "POST",
        url: "/add-cart",
        body: { pid: "productId123" }
      });
      req.id = "userId123"; // FIX

      const res = httpMocks.createResponse();
      const next = jest.fn();

      await cartController.addCart(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData().success).toBe(true);
    });
  });

  describe("updateCartProduct", () => {
    it("should return error when item not found", async () => {
      CartModel.findOneAndUpdate.mockResolvedValue(null);

      const req = httpMocks.createRequest({
        method: "PUT",
        url: "/cart/nonExistentId",
        params: { pid: "nonExistentId" },
        body: { quantity: 3 }
      });
      req.id = "userId123";

      const res = httpMocks.createResponse();
      const next = jest.fn();

      await cartController.updateCartProduct(req, res, next);

      expect(next).toHaveBeenCalled();
      const err = next.mock.calls[0][0];
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Cart is not found");
      expect(err.statusCode).toBe(400);
    });
  });
});


// jest.mock("../model/cart_model");
// jest.mock("../model/admin/product_model");
// const cartController = require('../controller/cart_controller');
// const httpMocks = require('node-mocks-http');
// const CartModel = require("../model/cart_model");
// const ProductModel = require("../model/admin/product_model");

// // Mock the models


// describe('Cart Controller', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('addCart', () => {
//     it('should add a new item to cart', async () => {
//       const mockCartData = {
//         pid: 'productId123',
//         uid: 'userId123'
//       };

//       CartModel.findOne.mockResolvedValue(null);
//       // CartModel.prototype.save = jest.fn().mockResolvedValue(true);
//       jest.mock("../model/cart_model");

//       CartModel.countDocuments.mockResolvedValue(1);

//       const req = httpMocks.createRequest({
//         method: 'POST',
//         url: '/add-cart',
//         body: { pid: 'productId123' },
//         id: 'userId123'
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.addCart(req, res, next);

//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().success).toBe(true);
//       expect(res._getJSONData().message).toBe("Item added to cart");
//     });

//     it('should increment quantity if item already exists in cart', async () => {
//       const mockExistingCart = {
//         pid: 'productId123',
//         uid: 'userId123',
//         quantity: 1,
//         save: jest.fn().mockResolvedValue(true)
//       };

//       CartModel.findOne.mockResolvedValue(mockExistingCart);
//       CartModel.countDocuments.mockResolvedValue(1);

//       const req = httpMocks.createRequest({
//         method: 'POST',
//         url: '/add-cart',
//         body: { pid: 'productId123' },
//         id: 'userId123'
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.addCart(req, res, next);

//       expect(mockExistingCart.quantity).toBe(2);
//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().success).toBe(true);
//     });
//   });

//   describe('getAllCartProduct', () => {
//     it('should return all cart products for user', async () => {
//       const mockCartProducts = [
//         {
//           _id: 'cartId123',
//           product: {
//             _id: 'productId123',
//             name: 'Test Product',
//             price: 100,
//             dummyPrice: 120
//           },
//           quantity: 2,
//           productTotalAmount: 240,
//           productDiscountAmount: 40,
//           productPaymentAmount: 200
//         }
//       ];

//       CartModel.aggregate.mockResolvedValue(mockCartProducts);

//       const req = httpMocks.createRequest({
//         method: 'GET',
//         url: '/cart',
//         id: 'userId123'
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.getAllCartProduct(req, res, next);

//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().success).toBe(true);
//       expect(res._getJSONData().data.cartProducts).toHaveLength(1);
//     });
//   });

//   describe('updateCartProduct', () => {
//     it('should update cart product quantity successfully', async () => {
//       CartModel.findOneAndUpdate.mockResolvedValue({ pid: 'productId123' });
//       CartModel.countDocuments.mockResolvedValue(1);

//       const req = httpMocks.createRequest({
//         method: 'PUT',
//         url: '/cart/productId123',
//         params: { pid: 'productId123' },
//         id: 'userId123',
//         body: { quantity: 3 }
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.updateCartProduct(req, res, next);

//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().success).toBe(true);
//       expect(res._getJSONData().message).toBe("Cart update successfully");
//     });

//     it('should return error when cart item not found', async () => {
//       CartModel.findOneAndUpdate.mockResolvedValue(null);

//       const req = httpMocks.createRequest({
//         method: 'PUT',
//         url: '/cart/nonExistentId',
//         params: { pid: 'nonExistentId' },
//         id: 'userId123',
//         body: { quantity: 3 }
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.updateCartProduct(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.objectContaining({
//         statusCode: 400,
//         message: 'Cart is not found'
//       }));
//     });
//   });

//   describe('removeCart', () => {
//     it('should remove cart item successfully', async () => {
//       CartModel.findOneAndDelete.mockResolvedValue({ pid: 'productId123' });
//       CartModel.countDocuments.mockResolvedValue(0);

//       const req = httpMocks.createRequest({
//         method: 'DELETE',
//         url: '/cart/productId123',
//         params: { pid: 'productId123' },
//         id: 'userId123'
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.removeCart(req, res, next);

//       expect(res.statusCode).toBe(200);
//       expect(res._getJSONData().success).toBe(true);
//       expect(res._getJSONData().message).toBe("Cart delete successfully");
//     });

//     it('should return error when cart item not found', async () => {
//       CartModel.findOneAndDelete.mockResolvedValue(null);

//       const req = httpMocks.createRequest({
//         method: 'DELETE',
//         url: '/cart/nonExistentId',
//         params: { pid: 'nonExistentId' },
//         id: 'userId123'
//       });
      
//       const res = httpMocks.createResponse();
//       const next = jest.fn();

//       await cartController.removeCart(req, res, next);

//       expect(next).toHaveBeenCalledWith(expect.objectContaining({
//         statusCode: 400,
//         message: 'Cart is not found'
//       }));
//     });
//   });
// });