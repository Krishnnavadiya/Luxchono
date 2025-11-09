const ProductModel = require("../model/admin/product_model");
const RatingModel = require("../model/rating_model");
const ApiError = require("../util/error");
const mongoose = require("mongoose");



module.exports = { getProducts, productPipeline, getOneProduct };