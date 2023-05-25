import express, { json } from 'express';
import { createProduct, getProduct, deleteProduct, updateProduct, getProducts, searchProducts } from '../controller/productController.js'
const router = express.Router()

router.post('/create', createProduct)
router.get('/:id', getProduct)
router.delete('/delete/:id', deleteProduct)
router.put('/update/:id', updateProduct)
router.post('/', getProducts)
router.get('/search/:key', searchProducts)

export default router