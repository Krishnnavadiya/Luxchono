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



module.exports = { makeOrder, paymentOrder, paymentVerification, getOrder, getAllOrder, cancelOrder, orderPipeline };