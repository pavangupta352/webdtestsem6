
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    img: String,
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  });
  

const Product = mongoose.model("Product", productSchema);



module.exports = Product;