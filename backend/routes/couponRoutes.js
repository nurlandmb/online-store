import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Coupon from '../models/couponModel.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const couponRouter = express.Router();


couponRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
  const coupons = await Coupon.find();
  res.send(coupons);
}))
couponRouter.get(
  '/:name',
  expressAsyncHandler(async (req, res) => {
    const name = req.params.name;
    const coupon = await Coupon.findOne({ name });
    if(coupon){
      return res.send(coupon);
    }
    res.status(404).send({message: 'Купон не найден'})
  })
);
couponRouter.post(
  '/save',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, discount } = req.body;
    const newCoupon = new Coupon({ name, discount });
    const coupon = await newCoupon.save();
    res.send(coupon);
  })
);
couponRouter.delete('/:name', expressAsyncHandler(async (req, res) => {
  const name = req.params.name;
  const coupon = Coupon.findOne({name});
  if(coupon){
    await coupon.remove();
    return res.send({message: 'Купон успешно удален'})
  }
  res.status(404).send({ message: 'Купон не найден' });

}))
export default couponRouter;
