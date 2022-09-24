const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.routes");

// route path for the product
app.use("/api/v1/product", productRoute);

// testing the get for api
app.get("/", (req, res) => {
  res.send("route is working! yea!");
});

module.exports = app;
