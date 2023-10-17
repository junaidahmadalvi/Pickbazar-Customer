const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./config/db");
var bodyParser = require("body-parser");

//------------- group routes have to test on postman-----------------

// require all routes

const customerRoute = require("./routes/customer.route");
const customerAuth = require("./middleware/customer.auth");

// DB-Connection
connection();

//  use  cors to run multiple servers
app.use(cors());

//  express's body parser to convetert data into JSON form
app.use(express.json());
// to parse data in json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//-----defining base routes of all entities--------

// <--------------------------OPEN ROUTES----------------------------->

// auth for user-login and register
app.post("/auth/customerRegister", customerAuth.registerCustomer);
app.post("/auth/customerLogin", customerAuth.loginCustomer);

// auth Globle middleware
app.use(customerAuth.authenticateCustomer);

// <--------------------------PROTECTED ROUTES----------------------------->

// customer route
app.use("/api/customer", customerRoute);

// start node server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
