const express = require("express");
const router = express.Router();

// require controller
const customerController = require("../controllers/customer.controller");

// <-----Shops--------->

// get all shops
router.get("/shops", customerController.getAllShops);
// get single author
router.get("/shop/:shopId", customerController.getShopById);

// <----------Products------------------------>
// get all product
router.get("/products", customerController.getAllProduct);
// get single product
router.get("/product/:productId", customerController.getProductById);

// <------------------Groups------------->

// get all groups
router.get("/groups", customerController.getAllGroup);

// get single group
router.get("/group/:groupId", customerController.getGroupById);

//<-----------Contact Us----------->

router.post("/addContact", customerController.addContact);

module.exports = router;
