const { Router } = require("express");
const { verifyUser } = require("../middleware/verify_user");
const { addAddress, getAddress, deleteAddress, updateAddress, getOneAddress } = require("../controller/address_controller");

const router = Router();

router.post("/", verifyUser, addAddress);
router.get("/", verifyUser, getAddress);
router.get("/:id", verifyUser, getOneAddress);


module.exports = router;