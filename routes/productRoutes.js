const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review");
const {isLoggedIn} = require("../middleware")
const Cart = require("../models/cart");


// get all products
router.get("/products", async(req,res)=>{

   const products =  await Product.find({});

    res.render("./products/product" , {products})

})


// get forms to create a new product
router.get("/products/new", async(req,res)=>{

     res.render("./products/new")
 
 })

 router.get("/cart", async (req, res) => {
   const cart = await Cart.findOne({ user: req.user._id }).populate(
     "items.product"
   );
 
   res.render("./cart/index", { cart });
 });
 


 //create a new product
 router.post("/products", async(req,res)=>{

    const {name , img , desc , price} = req.body;

    await Product.create({name , img , desc , price});

    req.flash("success" , "your product has been created sucessfully")

     res.redirect("/products")

 })

 router.post("/cart/:productid", async (req, res) => {
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
 


 //show a single product
 

 router.get("/products/:productid", isLoggedIn, async (req, res) => {
   const { productid } = req.params;
 
   const product = await Product.findById(productid).populate("review");
 
   res.render("./products/show", { product });
 });

 
 


 // get the edit form
 router.get("/products/:productid/edit" ,isLoggedIn, async(req, res)=>{

        const {productid} = req.params;

        const product = await Product.findById(productid);

   res.render("./products/edit" , {product})

 })


 //update a product
 router.patch("/products/:productid" , async(req,res)=>{

    const {name , img , price, desc } = req.body;

    const {productid} = req.params;

    await Product.findByIdAndUpdate(productid , { img , price , desc, name });

    req.flash("update", "your product has been updated");

   res.redirect("/products");


 })

 


 // delete a product
 router.delete("/products/:productid", async(req,res)=>{


    const {productid} = req.params;

    await  Product.findByIdAndDelete(productid);

    res.redirect("/products")

 })


module.exports = router;

