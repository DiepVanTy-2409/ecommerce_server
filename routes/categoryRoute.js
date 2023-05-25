import express from 'express'
import { createCategory, deleteCategory, updateCategory, getCategories } from '../controller/categoryController.js'
const router = express.Router()
router.post('/',createCategory)
router.delete('/:id',deleteCategory)
router.put('/:id',updateCategory)
router.get('/',getCategories)
export default router