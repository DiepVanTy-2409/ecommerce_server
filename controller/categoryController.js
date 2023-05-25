import CatergoryModel from "../model/category.js";

export const createCategory = async (req, res) => {
    try {
        const newCategory = new CatergoryModel({ name: req.body.name })
        await newCategory.save()
        res.status(200).json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const category = await CatergoryModel.findById(req.params.id)
        if (category) {
            await category.deleteOne()
            res.status(200).json(category)
        } else {
            res.status(404).json('category does not exist')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const updateCategory = async (req, res) => {
    try {
        const category = await CatergoryModel.findById(req.params.id)
        if(category) {
            category.updateOne({ name: req.body.name }, {new: true})
            res.status(200).json(category)
        } else {
            res.status(404).json('category does not exist')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
export const getCategories = async (req, res) => {
    try {
        res.status(200).json(await CatergoryModel.find())
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}



