const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "This name all ready taken "],
      minLength: [3, "name must be at lease 3 Characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      require: true,
      minLength: [10, "minimum 10 characters."],
    },
    price: {
      type: Number,
      required: [true, "Please this field is require"],
      min: [0, "Price Can't be negative"],
    },
    unit: {
      type: String,
      require: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value must be kg/litre/pcs only ",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {value}",
      },
    },
    //   createAt:{
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAt:{
    //     type: Date,
    //     default: Date.now,
    //   }
    //   supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier",
    //   },
    //   categories: [
    //     {
    //       name: {
    //         type: String,
    //         required: true,
    //       },
    //       _id: mongoose.Schema.Types.ObjectId,
    //     },
    //   ],
  },
  {
    timestamps: true,
  }
);

// Model
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("route is working! yea!");
});

// get the product
app.get("/api/v1/product", async (req, res, next) => {
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
});

// posting to database
app.post("/api/v1/product", async (req, res, next) => {
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
});

module.exports = app;
