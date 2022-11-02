require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require("./routes/user")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/user",userRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to the database")
        app.listen(process.env.PORT,()=>{
            console.log("Server is listening on port 4000...")
        })
    })
    .catch((err)=>{
        console.log(err)
    })