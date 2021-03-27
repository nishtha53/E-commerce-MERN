const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
const connect = async () => {
    //async function
    try {
      const connection = await mongoose.connect(
        "mongodb+srv://nishtha0503:nishtha050302@cluster0.4peow.mongodb.net/clothstore?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log("connected");
    } catch (err) {
        console.log('err: ', err);
      console.log("not connected");
    }
  };
connect();

//importing routes 
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route")
const wishList = require("./routes/wishlist.route")
// use routes
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(wishList);


app.listen(9001, () => {
    console.log(`Server is up on port 9001`);
});