const dataReadingModel = require('../models/dataReadingModel')
const mongoose = require('mongoose')


const getReading= async (req,res)=>{
    const {sourceId} = req.params

    const dataReading = await dataReadingModel.findOne({sourceId:sourceId},'reading',{sort: { 'timestamp' : -1 } })

    if(!dataReading){
        return res.status(404).json({error:"No such source id found"})
    }
    res.status(200).json(dataReading)
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
    }catch(err){
        res.json(err)
    }
}
module.exports = {
    createDataReading,
    getReading
}