import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: String,
    desc: String,
    cost: Number,
    images: [],
    categoryId: String,
}, {
    timestamp: true
})

const ProductModel = mongoose.model("Product", productSchema)
export default ProductModel