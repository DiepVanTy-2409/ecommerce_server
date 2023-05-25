import express from 'express';
import { register, login, isAdmin } from '../controller/authController.js'
import { isAdmin as checkIsAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/is-admin', requireSignIn, checkIsAdmin, isAdmin)


export default router