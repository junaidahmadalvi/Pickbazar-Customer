const express = require("express");
const router = express.Router();

// require controller
const customerController = require("../controllers/customer.controller");

//              User CRUD
//----------------------------------------------------------------------------

// get single customer
router.get("/", customerController.getCustomerById);

// //-----------Update Data----------------------

// dynamic update any field of customer (Single or multiple)
router.put("/", customerController.updateCustomer);

//endpoint to update customer address(nested document)
router.put("/addresses", customerController.updateCustomerAddresses);

//endpoint to update customer Password
router.put("/password", customerController.updateCustomerPassword);

// <------------------Groups------------->

// get all groups
router.get("/groups", customerController.getAllGroup);

// get single group
router.get("/group/:groupId", customerController.getGroupById);

// <-----Shops--------->

// get all shops
router.get("/shops", customerController.getAllShops);
// get single author
router.get("/shop/:shopId", customerController.getShopById);
module.exports = router;
