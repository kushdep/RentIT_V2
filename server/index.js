import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './ConnectDB.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

dotenv.config()
ConnectDB()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/',userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Connected on Port ${process.env.PORT}`)
})  








