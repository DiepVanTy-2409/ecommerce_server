import JWT from 'jsonwebtoken';
import UserModel from '../model/userModel.js';

export const requireSignIn = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY)
        req.user = decode
        console.log('AUTHMIDDLEWARE.JS LINE:8 ')
        console.log(decode)
        next()
    } catch (error) {
        console.log(error)
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).json('UnAuthorized Access')
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
}