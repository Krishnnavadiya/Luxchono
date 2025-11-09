const mongoose = require("mongoose");
const ApiError = require("../util/error");
const ProductModel = require("../model/admin/product_model");
const AddressModel = require("../model/address_model");
const CartModel = require("../model/cart_model");
const NotificationModel = require("../model/notification_model");
const { productPipeline } = require("./product_controller");
const { instance } = require("../config/razorpay_config");
const OrderModel = require("../model/order_model");
const crypto = require('crypto');
const { RAZORPAY_KEY_ID, WEBSITE_IMAGE_URL, RAZORPAY_CALLBACK_URL, RAZORPAY_KEY_SECRET, REDIRECT_FRONTEND_URL, FRONTEND_URL } = require("../config/config");
const { PENDING_STATUS, COMPLETED_STATUS, PAID_STATUS, ONLINE_PAYMENT_METHOD, CANCELLED_STATUS, CASH_PAYMENT_METHOD, PRIVATE_NOTIFICATION } = require("../config/string");
const { orderIdGenerate } = require("../util/utils");
const transporter = require("../util/transporter");
const path = require("path");
const fs = require("fs");

const orderPipeline = [
    {
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: "user",
            pipeline: [
                {
                    $project: {
                        username: 1,
                        email: 1,
                        phoneNo: 1,
                    }
                }
            ]
        }
    },
    {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true }
    },
    {
        $unwind: { path: "$products", preserveNullAndEmptyArrays: true }
    },
    {
        $lookup: {
            from: 'products',
            localField: 'products.product',
            foreignField: '_id',
            as: "product",
            pipeline: [
                ...productPipeline
            ]
        }
    },
    {
        $unwind: { path: "$product", preserveNullAndEmptyArrays: true }
    },
    {
        $project: {
            _id: 1,
            orderId: 1,
            razorpayOrderId: 1,
            paymentId: 1,
            product: "$product",
            orderProductPrice: "$products.orderProductPrice",
            quantity: "$products.quantity",
            totalAmount: 1,
            discountAmount: 1,
            paymentAmount: 1,
            status: 1,
            paymentStatus: 1,
            method: 1,
            user: 1,
            fullName: 1,
            phoneNo: 1,
            alternativePhoneNo: 1,
            state: 1,
            city: 1,
            address: 1,
            pincode: 1,
            addressType: 1,
            isCancelled: 1,
            cancelDate: 1,
            date: 1,
            latitude: 1,
            longitude: 1,
            deliveryDate: 1,
            createdAt: 1,
            updatedAt: 1,
            __v: 1
        }
    },
    {
        $group: {
            _id: "$_id",
            orderId: { $first: "$orderId" },
            razorpayOrderId: { $first: "$razorpayOrderId" },
            paymentId: { $first: "$paymentId" },
            products: {
                $push: {
                    product: "$product",
                    orderProductPrice: "$orderProductPrice",
                    quantity: "$quantity"
                }
            },
            totalAmount: { $first: "$totalAmount" },
            discountAmount: { $first: "$discountAmount" },
            paymentAmount: { $first: "$paymentAmount" },
            status: { $first: "$status" },
            paymentStatus: { $first: "$paymentStatus" },
            method: { $first: "$method" },
            user: { $first: "$user" },
            fullName: { $first: "$fullName" },
            phoneNo: { $first: "$phoneNo" },
            alternativePhoneNo: { $first: "$alternativePhoneNo" },
            state: { $first: "$state" },
            city: { $first: "$city" },
            address: { $first: "$address" },
            pincode: { $first: "$pincode" },
            addressType: { $first: "$addressType" },
            isCancelled: { $first: "$isCancelled" },
            cancelDate: { $first: "$cancelDate" },
            date: { $first: "$date" },
            latitude: { $first: "$latitude" },
            longitude: { $first: "$longitude" },
            deliveryDate: { $first: "$deliveryDate" },
            createdAt: { $first: "$createdAt" },
            updatedAt: { $first: "$updatedAt" },
            __v: { $first: "$__v" }
        }
    }
];

async function getOrderProduct(pid, quantity) {
    if (!mongoose.isValidObjectId(pid)) {
        throw new Error("Id is not valid");
    }
    const product = await ProductModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(pid),
                isActive: true,
            },
        },
        ...productPipeline
    ]).exec();

    if (product.length === 0) {
        throw new Error("Product not exist");
    }
    return {
        product: product[0],
        quantity,
        orderProductPrice: product[0].price,
        productTotalAmount: product[0].price * quantity
    }
}
async function makeOrder(req, res, next) {
    try {
        const body = req.body;
        let orderProducts = [];
        for (let i = 0; i < body.length; i++) {
            orderProducts.push(getOrderProduct(body[i].pid, body[i].quantity));
        }
        const data = await Promise.all(orderProducts);
        for (let e of data) {
            if (e.product.stock < e.quantity) {
                return next(new ApiError(400, `${e.product.name} product is out of stock`))
            }
        }
        let totalAmount = 0;
        let paymentAmount = 0;
        for (let i = 0; i < data.length; i++) {
            paymentAmount += data[i].productTotalAmount;
            totalAmount += (data[i].product.dummyPrice * data[i].quantity);
        }
        let discountAmount = totalAmount - paymentAmount;
        let deliveryDate = Date.now() + (86400 * 1000 * 5);
        res.status(200).json({
            statusCode: 200, success: true, data: {
                orderProducts: data,
                totalAmount,
                discountAmount,
                paymentAmount,
                deliveryDate: new Date(deliveryDate),
            }
        });
    } catch (e) {
        return next(new ApiError(400, e.message));
    }
}

async function paymentOrder(req, res, next) {
    try {
        const { products, address, cod } = req.body;
        if (!products) {
            return next(new ApiError(400, "Product is not empty"));
        }
        if (products.length === 0) {
            return next(new ApiError(400, "Product is not empty"));
        }
        if (!address) {
            return next(new ApiError(400, "Please enter address"));
        }
        const userAddress = await AddressModel.findOne({ uid: req.id, _id: address });
        if (!userAddress) {
            return next(new ApiError(400, "Enter valid address"));
        }
        const orderProducts = [];
        for (let i = 0; i < products.length; i++) {
            orderProducts.push(getOrderProduct(products[i].product, products[i].quantity));
        }
        const data = await Promise.all(orderProducts);
        for (let e of data) {
            if (e.product.stock < e.quantity) {
                return next(new ApiError(400, `${e.product.name} is out of stock`))
            }
        }
        let orderProduct = data.map((e) => ({ product: e.product._id, orderProductPrice: e.orderProductPrice, quantity: e.quantity }));
        let totalAmount = 0;
        let paymentAmount = 0;
        for (let i = 0; i < data.length; i++) {
            paymentAmount += data[i].productTotalAmount;
            totalAmount += (data[i].product.dummyPrice * data[i].quantity);
        }
        let discountAmount = totalAmount - paymentAmount;

        let deliveryDate = Date.now() + (86400 * 1000 * 5);

        const orderModel = new OrderModel({
            products: orderProduct,
            totalAmount,
            discountAmount,
            paymentAmount,
            user: req.id,
            fullName: userAddress.fullName,
            phoneNo: userAddress.phoneNo,
            alternativePhoneNo: userAddress.alternativePhoneNo,
            state: userAddress.state,
            city: userAddress.city,
            address: userAddress.address,
            pincode: userAddress.pincode,
            addressType: userAddress.addressType,
            date: Date.now(),
            deliveryDate: new Date(deliveryDate),
        });

        await orderModel.save();

        if (cod) {
            orderModel.method = CASH_PAYMENT_METHOD;
            orderModel.orderId = orderIdGenerate();
            orderModel.status = COMPLETED_STATUS;
            await orderModel.save({ validateBeforeSave: true });
            await CartModel.deleteMany({ uid: orderModel.user });
            return res.status(200).json({
                statusCode: 200, message: "Order placed successfully", data: {
                    orderId: orderModel._id
                }
            });
        }

        const order = await instance.orders.create({
            amount: paymentAmount * 100,
            currency: "INR",
        });
        orderModel.razorpayOrderId = order.id;
        orderModel.orderId = orderIdGenerate();
        orderModel.method = ONLINE_PAYMENT_METHOD;
        await orderModel.save();

        setTimeout(async () => {
            const orderDelete = await OrderModel.findOneAndDelete({ _id: orderModel._id, status: { $eq: PENDING_STATUS } });
        }, 1000 * 60 * 10);

        res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                key: RAZORPAY_KEY_ID,
                amount: paymentAmount * 100,
                currency: "INR",
                name: "Luxchono",
                description: "Watch not just a time",
                order_id: order.id,
                image: WEBSITE_IMAGE_URL,
                callback_url: RAZORPAY_CALLBACK_URL,
                prefill: {
                    name: req.user.username,
                    email: req.user.email,
                    contact: req.user.phoneNo || ''
                },
                notes: {
                    address: userAddress.address
                },
                theme: {
                    color: "#964315"
                }
            }
        });
    } catch (e) {
        return next(new ApiError(400, e.message));
    }
}


module.exports = { makeOrder, paymentOrder, paymentVerification, getOrder, getAllOrder, cancelOrder, orderPipeline };