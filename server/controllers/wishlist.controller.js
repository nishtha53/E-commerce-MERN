const Wishlist = require("../models/wishlist.model")
const Product = require("../models/product.model")
const User = require("../models/user.model")
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
const { request, response } = require("express");

exports.addToWishlist = async(req,res) => {
  const { productId } = req.query;
  console.log(productId)
  const user = req.user; //accessing user from authorization
  const _id = user._id;
  //console.log(firstName)
  try {
      const order = new Order({ Products: productId, owner: { _id }});
      console.log(order)
      await order.save((error, order) => {
          if(error) return res.status(400).json({ error });  
          if(order){
              res.status(201).json({ order });
          }
      })
      
  } catch (err) {
      res.status(500).json({ error: "Something went wrong!" });
  }
};


exports.myWishlist = async(request,response) =>{
    const user = request.user;
    const _id = user._id;
    try {
        const order = await Order.find({owner: _id}).populate();
        response.status(200).json(orders);
    } catch (error) {
      response.status(500).json({error:"Something went wrong in placing order!"}) 
      console.log(error); 
    }
};

//module.export = {
  //placeOrder,myOrder
//}