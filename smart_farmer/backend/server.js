require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const sockets = require("./sockets");
const morgan = require("morgan");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const userRouter = require("./routes/user");
const managerRouter = require("./routes/manager");
const dataReadingRouter = require("./routes/dataReading");
const ModuleRouter = require("./routes/Modules");
const { createTest } = require("./controllers/testController");
const cropYield = require("./routes/cropYield");
const photoData = require("./routes/photoData");
const adminRouter = require("./routes/admin");
const farmRouter = require("./routes/farm");
const historicalDataRouter = require("./routes/historicalData");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_HOST,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});


app.use("/api/user", userRouter);
app.use("/api/manager", managerRouter);
app.use("/api/datareading", dataReadingRouter);
app.use("/api/modules", ModuleRouter);
app.use("/api/cropyield/", cropYield);
app.use("/api/photos/", photoData);
app.use("/api/admin", adminRouter);
app.use("/api/farm", farmRouter);

app.use("/api/history/", historicalDataRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    io.on("connection",(socket)=>{


      socket.once("join_room",(room)=>{
          socket.join(room)
          console.log('joined to '+room)
          if(sockets[room]){
            sockets[room].push(socket)
          }else{
            sockets[room]=[socket]
          }
      })

    })
    server.listen(process.env.PORT, () => {
    });
  })
  .catch((err) => {
  });

module.exports = { app };
