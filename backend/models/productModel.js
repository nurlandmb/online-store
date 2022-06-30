import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isPopular: { type: Boolean, required: true, default: false },
    priceWithDiscount: {type: Number, required: false},
    keywords: { type: Array, required: false }
  },
  {
    timestamps: true,
  }
)

const Product = new mongoose.model('Product', productSchema)
export default Product;