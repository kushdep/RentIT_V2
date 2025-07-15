import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import express from 'express'
import ConnectDB from './ConnectDB.js'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { authentication } from './middlewares/authentication..js'


const app = express()

dotenv.config()
ConnectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"));
app.use(cors())
app.use('/', userRoutes)
app.use('/profile', authentication, profileRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Connected on Port ${process.env.PORT}`)
})









