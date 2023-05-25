import express from 'express';
import {getUser, updateUser, deleteUser, addToCart } from '../controller/userController.js'
const router = express.Router();

router.get('/:id', getUser)
router.get('/:id/update', updateUser)
router.get('/:id/delete', deleteUser)
router.get('/:id/addToCart', addToCart)

export default router

