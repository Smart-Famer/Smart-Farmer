const dataReadingModel = require('../models/dataReadingModel')
const mongoose = require('mongoose')



const  createDataReading= async (req,res)=>{
    const {timestamp,sourceId,reading}=req.body

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
    createDataReading
}