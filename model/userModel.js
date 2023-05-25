import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: [{
        productId: String,
        count: { type: Number, default: 0 }
    }]
}, {
    timestamps: true
})


const UserModel = mongoose.model('users', userSchema)
export default UserModel


