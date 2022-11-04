require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require("./routes/user")
const managerRouter = require("./routes/manager")
const dataReadingRouter = require("./routes/dataReading")
const {createTest} = require('./controllers/testController')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// app.post("/api/fetch-data/temp",(req, res)=>{
//     console.log(req.body.reading)
//     console.log(req.body.sourceId)
//     res.status(200).json({msg:`Data Recieved : ${req.body.reading}`})
// })
// app.user("/api/fetch-data/",dataReadingRouter)
app.use("/api/user",userRouter)
app.use("/api/manager",managerRouter)
app.use("/api/datareading",dataReadingRouter)
// app.post("/test",createTest)


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