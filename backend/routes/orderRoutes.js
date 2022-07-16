import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      discount: req.body.discount,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      status: req.body.status,
    });
    const order = await newOrder.save();
    res.status(201).send({ message: 'Создана новая заявка', order });
  })
);

orderRouter.post(
  '/edit/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Product.findById(req.params.id);
    order.status = req.body.status;
    const newOrder = await order.save();
    res.send(newOrder)
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    res.send(order);
  })
);
orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Заказ не найден' });
    }
  })
);

export default orderRouter;
