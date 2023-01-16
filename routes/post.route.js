const { Router } = require("express");
const { autenticate } = require("../middlewares/authenticate");

const productPost = Router();

const { productModel } = require("../models/Product.model");

productPost.use(autenticate);

productPost.get("/", async (req, res) => {
  const { device } = req.query;
  let product;
  try {
    if (device) {
      product = await productModel.find({ device: device });
    } else {
      product = await productModel.find();
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

productPost.post("/create", async (req, res) => {
  try {
    const newProduct = new productModel(req.body);
    await newProduct.save();
    res.status(201).send({
      message: "productPost created successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

productPost.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findOne({ _id: id });
  const userId_in_product = product.userId;
  const userId_who_is_making_request = req.body.userId;
  try {
    if (userId_in_product !== userId_who_is_making_request) {
      res.send({
        message: "You are not allowed to make this request",
      });
    } else {
      await productModel.findByIdAndUpdate(id, req.body);
      res.status(200).send({
        message: "Product updated successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

productPost.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findOne({ _id: id });
  const userId_in_product = product.userId;
  const userId_who_is_making_request = req.body.userId;
  try {
    if (userId_in_product !== userId_who_is_making_request) {
      res.send({
        message: "You are not allowed to make this request",
      });
    } else {
      await productModel.findByIdAndDelete(id);
      res.status(200).send({
        message: "Product delete successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = {
  productPost,
};
