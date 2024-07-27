import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoute.js'
import messsageRoutes from './routes/messageRoute.js'
import userRoute from './routes/userRoute.js'
import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello word !!!!!!!!!!!!!!!!!')
})

app.use("/api/auth", authRoutes)
app.use("/api/message", messsageRoutes)
app.use("/api/users", userRoute)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`server Running on port ${PORT}`)
})