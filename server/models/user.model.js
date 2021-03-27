const mongoose = require("mongoose");
const {Schema} = mongoose;

//creating schema
const userSchema = new Schema(
    {
        name:   {
            type:String,
        },
        email:  {
            type:String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
        },
        userType:{
            type:String,
            default:"user",
        },
    },
    { timestamps: true}
);

const User = mongoose.model("User",userSchema);
module.exports = User;