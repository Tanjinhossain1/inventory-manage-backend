const express = require("express");
const ProductController = require("../controllers/Product.controllers");
const router = express.Router();

router.route("/")
  .get(ProductController.findAllProduct)
  .post(ProductController.createTheProduct);


module.exports = router