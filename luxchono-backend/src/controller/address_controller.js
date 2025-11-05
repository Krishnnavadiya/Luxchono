const ApiError = require("../util/error");
const AddressModel = require("../model/address_model");

async function addAddress(req, res, next) {
    try {
        const body = req.body;
        body.uid = req.id;
        const address = new AddressModel(body);
        await address.save();
        res.status(200).json({ statusCode: 200, success: true, message: 'Address save successfully' });
    } catch (e) {
        return next(new ApiError(400, 'Enter valid address details'));
    }
}

async function getAddress(req, res, next) {
    try {
        const uid = req.id;
        const addresses = await AddressModel.find({ uid }).select("-uid");
        res.status(200).json({ statusCode: 200, success: true, message: 'Get all address', data: addresses });
    } catch (e) {
        return next(new ApiError(400, e.message));
    }
}



module.exports = { addAddress, getAddress, getOneAddress, updateAddress, deleteAddress };