const dataReadingModel = require('../models/dataReadingModel')
const mongoose = require('mongoose')


const getReading= async (req,res)=>{
    const {sourceId} = req.params
    // console.log(sourceId)
    const dataReading = await dataReadingModel.findOne(
      { sourceId: sourceId },
      "sourceId reading",
      { sort: { timestamp: -1 } }
    );
    // console.log(dataReading)
    if(!dataReading){
        return res.status(404).json({error:"No such source id found"})
    }
    res.status(200).json(dataReading)
}
const getReadings= async (req,res)=>{
    const {sourceIds} = req.body
    console.log(typeof(sourceIds))
    const dataReadings = await dataReadingModel.find({sourceId:{$in:sourceIds}},null,{sort: { 'timestamp' : -1 } })
    console.log(dataReadings)
    if(!dataReadings){
        return res.status(404).json({error:"No such source id found"})
    }
    res.status(200).json(dataReadings)
}
const  createDataReading= async (req,res)=>{
    const {timestamp,sourceId,reading}=req.body

    console.log(reading)
    console.log(sourceId)
    console.log(timestamp)

    try{
        const dataReading = await dataReadingModel.create({
            timestamp,
            sourceId,
            reading
        })
        res.json(dataReading)
    }catch(error){
        res.json(error)
    }
}
module.exports = {
    createDataReading,
    getReading,
    getReadings
}