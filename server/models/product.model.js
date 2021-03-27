const mongoose = require("mongoose");
const {Schema} = mongoose;

//creating schema
const productSchema = new Schema(
    {
        title:{
            type: String,
            required:true
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required:true
        },
        description: {
            type: String,
        },
    },
    {timestamps: true}
);

const Product = mongoose.model("Product",productSchema);
module.exports = Product;