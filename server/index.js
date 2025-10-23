import http from "http"
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import express from 'express'
import ConnectDB from './ConnectDB.js'
import locRoutes from './routes/locRoutes.js'
import userRoutes from './routes/userRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import { authentication } from './middlewares/authentication..js'
import {initSocket} from "./socket.js"

const app = express()
const scktSrvr = http.createServer(app)
initSocket(scktSrvr)

dotenv.config()
ConnectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(morgan("dev")); 
app.use(cors({
  origin: '*',
}))
app.use('/', userRoutes)
app.use('/rent-locs', locRoutes)
app.use('/profile', authentication, profileRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Connected on Port ${process.env.PORT}`)
})

scktSrvr.listen(5000,()=>console.log("Listening on port 5000"))







