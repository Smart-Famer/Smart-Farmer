const dataReadingModel = require('../models/dataReadingModel')
const mongoose = require('mongoose')
const sockets = require('../sockets')
const farmModel = require('../models/farmModel')
const sensorModel = require('../models/sensorModel')


const getReading= async (req,res)=>{
    const {sourceId} = req.params
    // console.log(sourceId)
    const dataReading = await dataReadingModel.findOne(
      { sourceId: sourceId },
      "sourceId reading",
      { sort: { timestamp: -1 } }
    );
    if(!dataReading){
        return res.status(404).json({error:"No such source id found"})
    }
    // console.log(dataReading)
    res.status(200).json(dataReading)
}
const getReadings= async (req,res)=>{
    const {sourceIds} = req.body
    console.log(typeof(sourceIds))
    const dataReadings = await dataReadingModel.find({sourceId:{$in:sourceIds}},null,{sort: { 'timestamp' : -1 } })
    if(!dataReadings){
        return res.status(404).json({error:"No such source id found"})
    }
    res.status(200).json(dataReadings)
}

const getAllReadings = async (req,res)=>{
    const source_ids = req.query.sourceids;
    const sourceIds = source_ids.split(",");

    const dataReadings = await dataReadingModel.find({sourceId:{$in:sourceIds}},null,{sort: { 'timestamp' : -1 }})
    const latest = {}
    dataReadings.forEach(dataReading => {
        if(!(dataReading.sourceId in latest)){
            latest[dataReading.sourceId] = dataReading.reading
        }
    });
    if (!dataReadings) {
      return res.status(404).json({ error: "No such source ids found" });
    }
    res.status(200).json(latest);
}
const  createDataReading= async (req,res)=>{
    const {timestamp,reading, secret_key}=req.body
    let {sourceId} = req.body

    // console.log(reading)
    // console.log(sourceId)
    // console.log(timestamp)
    // console.log(secret_key)

    try{
        const farmObj = await farmModel.findOne({secret_key},{_id:1})
        if(!farmObj){
            throw Error("Invalid Secret Key. Plz exit an re-enter with a valid key")
        }

        const farmId = farmObj._id.toString()
        sourceId = farmId+"-"+sourceId

        const sensor = await sensorModel.findOne({port:sourceId})
        if(!sensor){
            throw Error("Port Does not Exist")
        }
        
        console.log(sourceId, farmId)
        const dataReading = await dataReadingModel.create({
            timestamp,
            sourceId,
            reading
        })

        if(sockets[farmId]){
            sockets[farmId].forEach(socket => {
                socket.to(farmId).emit("dataReadingUpdate",{timestamp,sourceId,reading})
            });
        }
        

        res.status(200).json(dataReading)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
module.exports = {
  createDataReading,
  getReading,
  getReadings,
  getAllReadings,
};