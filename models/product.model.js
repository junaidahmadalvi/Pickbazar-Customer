const mongoose = require("mongoose");
const yup = require("yup");

// mongoose schema
const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "publish"],
    },
    productType: {
      type: String,
      enum: ["simple", "variable"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // Reference to the "Group" model
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the "Category" model
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Reference to the "Shop" model
      required: true,
    },
    shopName: {
      type: String,
    },
    authorName: {
      type: String,
      required: true,
    },
    manufacturerName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// <============create collection============>
const Product = new mongoose.model("Product", productModel);

module.exports = {
  Product,
  productModel,
};
