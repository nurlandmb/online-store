import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  discount: {type: Number, required: true},
  name: {type: String, required: true},
})

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;