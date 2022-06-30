import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';
import express from 'express';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.post(
  '/edit/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.isPopular = req.body.isPopular || product.isPopular;
    product.priceWithDiscount =
    req.body.priceWithDiscount || product.priceWithDiscount;
    product.keywords = req.body.keywords || product.keywords;

    const updatedProduct = await product.save();
    res.send(updatedProduct);
  })
);
productRouter.post(
  '/create',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      isPopular: req.body.isPopular,
      priceWithDiscount: req.body.priceWithDiscount,
      keywords: req.body.keywords
    })
    const product = await newProduct.save();
    res.send(product);
  })
);

export default productRouter;