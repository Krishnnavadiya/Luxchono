const ProductModel = require("../model/admin/product_model");
const RatingModel = require("../model/rating_model");
const ApiError = require("../util/error");
const mongoose = require("mongoose");

const productPipeline = [
    {
        $addFields: {
            image: {
                $map: {
                    input: "$image",
                    as: "image",
                    in: "$$image.url"
                }
            }
        }
    },
    {
        $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
        }
    },
    {
        $lookup: {
            from: 'brands',
            localField: 'brand',
            foreignField: '_id',
            as: 'brand'
        }
    },
    {
        $addFields: {
            brand: {
                $arrayElemAt: ['$brand', 0]
            }
        }
    },
    {
        $lookup: {
            from: 'ratings',
            localField: '_id',
            foreignField: 'product',
            as: 'rating',
        }
    },
    {
        $addFields: {
            totalReviews: { $size: '$rating' },
            rating: { $avg: '$rating.star' }
        }
    },
    {
        $addFields: {
            rating: {
                $cond: {
                    if: { $eq: ['$rating', null] },
                    then: 0,
                    else: "$rating"
                }
            }
        }
    }
];



module.exports = { getProducts, productPipeline, getOneProduct };