require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const userRouter = require("./routes/user")
const managerRouter = require("./routes/manager")
const dataReadingRouter = require("./routes/dataReading")
const addModuleRouter = require('./routes/Modules')
const {createTest} = require('./controllers/testController')
const cropYield = require('./routes/cropYield')


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user",userRouter)
app.use("/api/manager",managerRouter)
app.use("/api/datareading",dataReadingRouter)
app.use("/api/modules",addModuleRouter)
app.use("/api/cropyield/",cropYield)

let x = ['a','b','c']
let y = x.map((e)=>{
    return 0
})
y[1]=1
console.log(y)

// const date = new Date()
// const month = date.getMonth()
// console.log(date)
// console.log(month)

// function random_rgb() {
//     const R = Math.floor((Math.random() * 255) + 1);
//     const G = Math.floor((Math.random() * 255) + 1);
//     const B = Math.floor((Math.random() * 255) + 1);
//     const rgb = `(rgb(${R},${G},${B}))`
//     return rgb
// }

// var color = random_rgb();

// console.log(color)

// function random_rgb() {
//     const R = Math.floor((Math.random() * 255) + 1);
//     const G = Math.floor((Math.random() * 255) + 1);
//     const B = Math.floor((Math.random() * 255) + 1);
//     const rgb = [R,G,B]
//     return rgb
// }

// let color = random_rgb();
// let test = `(${color.join(",")})`
// console.log(test)




// let car = {
//     'type':'toyota'
// }
// let en = 'engine'
// car[en] = 'v8'

// console.log(car)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port 4000...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
