import UserModel from '../model/userModel.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const { userName, email, password, phone, address } = req.body

    if (!userName) {
        return res.send({ error: 'userName is required!' })
    }
    if (!email) {
        return res.send({ error: 'email is required!' })
    }
    if (!password) {
        return res.send({ error: 'password is required!' })
    }
    if (!phone) {
        return res.send({ error: 'phone is required!' })
    }
    if (!address) {
        return res.send({ error: 'address is required!' })
    }


    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const oldUser = await UserModel.findOne({ email: email })
        if (oldUser) {
            return res.status(400).json({ message: 'user already exists' })
        }
        const user = new UserModel({
            userName, email, phone, address, password: hashedPassword
        })
        await user.save()
        const { password, role, ...otherDetails } = user._doc

        const token = jwt.sign({
            userName: user._id, id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })
        res.status(200).json({ ...otherDetails, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}
export const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(404).json('Invalid email or password~')
    }

    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exits' })
        }
        else {
            const { password, ...otherDetails } = user._doc
            const validity = await bcrypt.compare(req.body.password, password)
            if (!validity) {
                return res.status(400).json({ message: 'wrong password' })
            } else {
                const token = jwt.sign({
                    userName: user.name, _id: user._id,
                }, process.env.JWT_KEY, { expiresIn: '3d' })
                res.status(200).json({ ...otherDetails, token })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error })
        console.log({ message: error })
    }
}



export const isAdmin = async (req, res) => {
    try {
        res.status(200).json(true)
    } catch (error) {
        res.status(500).json(error)
    }
}