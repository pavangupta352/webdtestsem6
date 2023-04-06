const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/Product");

// Get cart data
router.get("/cart", async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json({ items: cart.items });
  });
  
  // Add item to cart
  router.post("/cart/:productid/add", async (req, res) => {
    const { productid } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    const product = await Product.findById(productid);
  
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/products");
    }
  
    if (!cart) {
      // create a new cart if one doesn't exist
      const newCart = new Cart({
        user: req.user._id,
        items: [{ product: product._id, quantity: 1 }],
      });
      await newCart.save();
    } else {
      // check if the product is already in the cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product._id.toString()
      );
      if (existingItem) {
        // update the quantity of the existing item
        existingItem.quantity += 1;
      } else {
        // add the product as a new item
        cart.items.push({ product: product._id, quantity: 1 });
      }
      await cart.save();
    }
  
    req.flash("success", "Product added to cart");
    res.redirect(`/products/${productid}`);
  });
  
  module.exports = router;
  
