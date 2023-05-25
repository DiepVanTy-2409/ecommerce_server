import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connetMongoDB } from './config/db.js'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'

// env configuration
dotenv.config()

const App = express();

const port = process.env.PORT || 5000

// middleware
App.use(cors())
App.use('/images',express.static('public/images'))
App.use(bodyParser.json({ limit: '30mb', extended: true }))
App.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// create connect to mongodb
connetMongoDB()

// routes
App.use('/auth', authRoute)
App.use('/product', productRoute)
App.use('/upload', uploadRoute)
App.use('/user', userRoute)
App.use('/category', categoryRoute)
// app listeners
App.listen(port, () => console.log(`listening on port ${port}`))