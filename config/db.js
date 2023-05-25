import mongoose from "mongoose"
export const connetMongoDB = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB)
        console.log('connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}