const Product = require("../models/Product");

// THis Is The Get For All The Product 
exports.findAllProduct = async (req, res, next) => {
  try {
    const product = await Product.find({});
    res.status(200).json({
      status: "success",
      message: "Data Find Properly",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data Not Be Find ",
      error: error.message,
    });
  }
};

// This is the post for create the Product 
exports.createTheProduct = async (req, res, next) => {
  try {
    const result = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Your Product is Inserted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data Not Insert",
      error: error.message,
    });
  }
};
