import ProductModel from "../model/productModel.js";
import fs from 'fs'
export const createProduct = async (req, res) => {
    try {
        const product = new ProductModel({
            ...req.body,
        })
        await product.save()
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).json('product is not exist')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await ProductModel.findByIdAndDelete(id)
        product.images?.map(image => {
            fs.unlinkSync('public/images/' + image)
        })
        res.status(200).json(id)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const updateProduct = async (req, res) => {
    console.log('HERE' + req.body.title)
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const getProducts = async (req, res) => {
    const skip = req.body.skip || 0
    try {
        let products = []
        const { checked, radio } = req.body
        if (checked?.length && radio?.length) {
            products = await ProductModel.find({
                categoryId: { $in: checked },
                cost: { $gte: radio[0], $lte: radio[1] }
            }).skip(skip).limit(process.env.LIMIT_LOAD_PRODUCTS)
        } else {
            products = await ProductModel.find().skip(skip).limit(process.env.LIMIT_LOAD_PRODUCTS)
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const searchProducts = async (req, res) => {
    const key = req.params.key
    try {
        const results = await ProductModel.find({
            $or: [
                { title: { $regex: new RegExp(key, 'i') } },
                // { desc: { $regex: new RegExp(key, 'i') } }
            ]
        }).collation({ locale: 'vi', strength: 2 })
        res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
}
