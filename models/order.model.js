const mongoose = require("mongoose");
const yup = require("yup");
const { productModel } = require("./product.model");

// mongoose schema
const orderModel = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "Order Processing",
      enum: [
        "Pending",
        "Order Processing",
        "Order At Local Facility",
        "Order Out For Delivery",
        "Order Completed",
      ],
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    billingAddress: {
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
    shippingAddress: {
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
    date: {
      type: Date,
      default: Date.now(),
    },
    // products: {
    //   type: Array,
    //   // default: [],
    // },
    items: [
      {
        item: {
          type: productModel,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
        itemTotal: {
          type: Number,
        },
      },
    ],
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the "Group" model
      required: true,
    },
  },
  { timestamps: true }
);

// <============create collection============>
const Order = new mongoose.model("Order", orderModel);

module.exports = {
  Order,
};
