const mongoose = require("mongoose");
const CartModel = require("../model/cart_model");
const ApiError = require("../util/error");
const { productPipeline } = require("./product_controller");

async function addCart(req, res, next) {
    try {
        const id = req.id;
        const { pid } = req.body;
        const findCartProduct = await CartModel.findOne({ pid, uid: id });
        if (findCartProduct) {
            findCartProduct.quantity = findCartProduct.quantity + 1;
            await findCartProduct.save();
            let length = await CartModel.countDocuments({ uid: id });
            return res.status(200).json({
                statusCode: 200,
                success: true,
                message: "Item added to cart",
                data: {
                    length
                }
            });
        }
        const cartProduct = new CartModel({ pid, uid: id });
        await cartProduct.save();
        let length = await CartModel.countDocuments({ uid: id });
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Item added to cart",
            data: {
                length
            }
        });
    } catch (e) {
        return next(new ApiError(400, e.message));
    }
}


module.exports = { addCart, getAllCartProduct, updateCartProduct, removeCart, getAllCartIds };