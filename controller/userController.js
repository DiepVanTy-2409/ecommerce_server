import UserModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        if (user) {
            const { password, ...otherDetails } = user
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json('user not found')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, password } = req.body
    try {
        if (id === currentUserId) {
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            const { password, ...otherDetails } = user
            res.status(200).json(otherDetails)
        } else {
            res.status(403).json('Access Denied! You can only update your own profile')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, password } = req.body
    try {
        const user = await UserModel.findById(id)
        const validationPassword = await bcrypt.compare(password, user.password)
        if (id === currentUserId && validationPassword) {
            await user.deleteOne()
        } else {
            res.status(403).json('Access Denied!')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const addToCart = async (req, res) => {
    // const id = req.params.id
    // const { productId } = req.body
    // try {
    //     const user = await UserModel.findById(id)
    //     if (!user.cart.some(product => product._id === productId)) {
    //         const result = user.updateOne({ $push: { cart: productId } })
    //     }
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json(error)
    // }
}