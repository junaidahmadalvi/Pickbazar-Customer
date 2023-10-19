const mongoose = require("mongoose");
const yup = require("yup");

// mongoose schema
const contactModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//---------- Contact Yup(validating schemas)---------

// Yup contact Us schema
const yupContactSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabets and spaces are allowed in the name"
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  subject: yup.string().required("subject is required"),
  description: yup.string().required("description is required"),
});

// <============create collection============>
const Contact = new mongoose.model("Contact", contactModel);

module.exports = {
  Contact,
  yupContactSchema,
};
