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

//---------- Product Yup(validating schemas)---------

// Yup register product schema
const yupProductSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets and spaces are allowed in the name"
    ),
  groupId: yup
    .string()
    .trim()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Group ID format"), // Ensure it's a valid ObjectId

  groupName: yup.string().required("Group Name is required"),

  image: yup.string(),

  description: yup.string(),

  status: yup
    .string()
    .required("Status is required")
    .oneOf(["draft", "publish"], "Invalid status"),
  productType: yup
    .string()
    .oneOf(["simple", "variable"], "Invalid product type"),
  price: yup.number().required("Price is required"),
  quantity: yup.number().required("Quantity is required"),
  categoryId: yup
    .string()
    .trim()
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Category ID format"), // Ensure it's a valid ObjectId
  categoryName: yup.string().required("Category name is required"),
  shopId: yup
    .string()
    .trim()
    .required("ShopId is required")
    .matches(/^[0-9a-fA-F]{24}$/, "Invalid Shop ID format"), // Ensure it's a valid ObjectId
  shopName: yup.string(),
  authorName: yup.string().required("author name is required"),
  manufacturerName: yup.string().required("manufacterer name is required"),
});

// <============create collection============>
const Product = new mongoose.model("Product", productModel);

module.exports = {
  Product,
  yupProductSchema,
};
