const { Customer } = require("../models/customer.model");

var ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const bcrypt = require("bcrypt");
const {
  customerRegisterSchema,
  customerLoginSchema,
} = require("../models/customer.model");

module.exports = {
  //----------< Authentification>  ------------------

  authenticateCustomer: async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];

    // Check if the Authorization header exists and starts with 'Bearer '
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      // Extract the token (remove 'Bearer ' from the beginning)
      try {
        const token = authorizationHeader.slice(7);

        // Check if a token is provided
        if (!token) {
          return res
            .status(401)
            .json({ message: "Authentication token is missing." });
        } else {
          const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

          const customerId = decode.customerId;
          req.customerId = customerId;

          // Get Customer from Token
          const customer = await Customer.findById(customerId);

          if (customer) {
            console.log("customer authenticated");
            next();
          } else {
            res
              .status(403)
              .json({ error: "Authentication failed. Invalid token." });
          }
        }
      } catch (error) {
        return res.status(401).json({
          status: "fail",
          error: error.message,
        });
      }
    } else {
      res.status(401).json({
        status: "fail",
        message: "Authentication token is missing.",
      });
    }
  },

  // customer register
  registerCustomer: async (req, res) => {
    try {
      let customerData = req.body;

      customerData &&
        (await customerRegisterSchema.validate(customerData, {
          abortEarly: false,
        }));

      let customer = await Customer.findOne({ email: customerData?.email });

      // validate email exist
      if (customer) {
        res.status(400).json({
          status: "fail",
          error: "email already exist",
        });
      } else {
        // validate password and confirmPassword match
        if (customerData?.password != customerData?.confirmPassword) {
          res.status(400).json({
            status: "fail",
            error: "Password and Confirm Password must same",
          });
        } else {
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashpswd = await bcrypt.hash(customerData?.password, salt);
          let requestData = {
            name: customerData?.name,
            email: customerData?.email,
            password: hashpswd,
          };

          customer = new Customer(requestData);

          const result = await customer.save();

          res.status(200).send({
            status: "success",
            message: "Customer added Successfully",
            data: result,
          });
        }
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};

        error.inner &&
          error.inner.length > 0 &&
          error.inner.forEach((validationError) => {
            validationErrors[validationError.path] = validationError.message;
          });

        const entries = Object.entries(validationErrors);
        entries &&
          entries.length > 0 &&
          res.status(400).json({
            status: "fail",
            error: entries[0][1],
          });
      } else {
        console.log("internal server error", error);
        res.status(500).json({
          status: "fail",
          error: `Internal server Error: ${error}`,
        });
      }
    }
  },

  // Customer login controller
  loginCustomer: async (req, res) => {
    try {
      const customerData = req.body;

      customerData &&
        (await customerLoginSchema.validate(customerData, {
          abortEarly: false,
        }));
      const { email, password } = req.body;
      let customer = await Customer.findOne({ email: email });

      if (customer != null) {
        // check given password match with DB password of particular customer OR not and return true/false
        const isMatch = await bcrypt.compare(password, customer?.password);

        if (customer.email === email && isMatch) {
          if (customer.status === "active") {
            // Generate JWT Token
            const token = jwt.sign(
              { customerId: customer._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "2d" }
            );

            res.setHeader("Authorization", `Bearer ${token}`);

            //remove password field from customer object
            delete customer?.password;
            res.status(200).send({
              status: "success",
              message: "Login Success",
              token: token,
              data: customer,
            });
          } else {
            res.status(400).send({
              status: "fail",
              error: "Access Denied by Admin",
            });
            console.log("Customer Access Denied by Admin");
          }
        } else {
          res.status(400).json({
            status: "fail",
            error: "Email or password is not Valid",
          });
        }
      } else {
        res.status(400).json({
          status: "fail",
          error: "Email or password is not Valid",
        });
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};

        error.inner &&
          error.inner.length > 0 &&
          error.inner.forEach((validationError) => {
            validationErrors[validationError.path] = validationError.message;
          });

        const entries = Object.entries(validationErrors);
        entries &&
          entries.length > 0 &&
          res.status(400).json({
            status: "fail",
            error: entries[0][1],
          });
      } else {
        console.log("internal server error", error);
        res.status(500).json({
          status: "fail",
          error: `Internal server Error`,
        });
      }
    }
  },
};
