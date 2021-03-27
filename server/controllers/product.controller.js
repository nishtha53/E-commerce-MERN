const Product = require('../models/product.model');
const { request, response } = require("express");
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);

//add product
const addProduct = (request, response) => {
    const {
        title,price,decription
    } = request.body;
    const product = new Product({
      title,
      price,
      decription
  });
  product.save(((error,product)=>{
    if(error) return response.status(400).json({error});
    if(product){
        response.status(201).json({product});
    }
  }));
}
//exports.addProduct = addProduct;

//get all products
const getAllProducts = async (request, response) => {
  try {
      const products = await Product.find()
      response.status(201).json(products);
  }
  catch (error) {
      console.log("error in getting products", error)
  }
}
//exports.getAllProducts = getAllProducts;

//update a product

const updateProduct = async (request, response) => {
  const _id = request.params.id;
  const data = request.body;
  try {
      const product = await Product.findByIdAndUpdate(
          { _id },
          { $set: data },
          { new: true }
      )
      if (!product) {
          return response.status(404).json("product not found");
      }
      return response.status(200).json(product);
  } catch (error) {
      console.log(error, "error :")
  }
}
//exports.updateProduct = updateProduct;

//delete product
const deleteProduct = async (request, response) => {
  const _id = request.params.id;
  try {
      const product = await Product.findByIdAndDelete({ _id });
      if (!product) {
          return response.status(404).json("User does not exist ");
      }
      response.status(200).json(product);

  } catch (error) {
      console.log("error", error);
  }
}
//exports.deleteProduct = deleteProduct;

module.exports = {
    addProduct,getAllProducts,updateProduct,deleteProduct
}