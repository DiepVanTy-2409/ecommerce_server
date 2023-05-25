import express from 'express';
import multer from 'multer';
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
router.post('/', upload.array('images[]'), async (req, res) => {
    res.status(200).json('upload success')
})

export default router