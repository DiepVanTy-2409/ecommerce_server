import mongoose from "mongoose";
const CategorySchema  = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    }
})

const CatergoryModel = mongoose.model("category", CategorySchema)
export default CatergoryModel