const mongoose = require("mongoose");
const yup = require("yup");

// mongoose schema
const shopModel = new mongoose.Schema(
  {
    // SellerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Seller", // Reference to the "Seller" model
    // },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    coverImg: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
    },
    contactNumber: {
      type: Number,
    },
    status: {
      type: String,
      default: "active",
    },
    // socialProfile: {
    //   name: { type: String },
    //   url: { type: String },
    // },
    shopAddress: {
      country: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      zip: {
        type: Number,
        // required: true,
      },
      streetAddress: {
        type: String,
        // required: true,
      },
    },
  },
  { timestamps: true }
);

//---------- Shop Yup(validating schemas)---------

const shopYupSchema = yup.object().shape({
  // SellerId: yup
  //   .string()
  //   .trim()
  //   .required("SellerId is required")
  //   .matches(/^[0-9a-fA-F]{24}$/, "Invalid SellerId format"), // Ensure it's a valid ObjectId

  name: yup
    .string()
    .required("shop name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets and spaces are allowed in the name"
    ),

  logo: yup.string().url("Invalid URL format"),

  coverImg: yup.string().url("Invalid URL format"),

  website: yup.string().url("Invalid URL format"),

  description: yup.string().trim().required("Description is required"),
  ownerName: yup
    .string()
    .required("Owner name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets and spaces are allowed in the name"
    ),

  contactNumber: yup
    .string()
    .matches(
      /^(?:\+92|0)[1-9]\d{9}$/,
      "Contact number must in 03XXXXXXXXX format"
    ),

  status: yup.string().oneOf(["active", "inactive"], "Invalid status value"),

  // socialProfile: yup.object().shape({
  //   name: yup.string(),
  //   url: yup.string().url("Invalid URL format"),
  // }),

  shopAddress: yup.object().shape({
    country: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().trim(),
    zip: yup
      .number()
      .integer("Zip code must be an integer")
      .typeError("Invalid zip code format")
      .positive("Zip code must be a positive number")
      .integer(),
    streetAddress: yup.string().trim(),
  }),
});

const shopYupUpdateAddressSchema = yup.object().shape({
  country: yup.string().required("Country is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  zip: yup
    .number()
    .integer("Zip code must be an integer")
    .typeError("Invalid zip code format")
    .positive("Zip code must be a positive number")
    .integer()
    .required("Zip code is required"),
  streetAddress: yup.string().trim().required("Street address is required"),
});
// <============create collection============>
const Shop = new mongoose.model("Shop", shopModel);

module.exports = {
  Shop,
  shopYupSchema,
  shopYupUpdateAddressSchema,
};
