const dataReadingModel = require('../models/dataReadingModel')
const mongoose = require('mongoose')

const getTempHistory= async(req,res)=>{
    const source_ids = req.query.sourceids
    const sourceIds = source_ids.split(",")
    const duration = req.query.duration
    console.log(sourceIds,duration);
    const tempHistory = await dataReadingModel.find({
      sourceId: {
        $in: sourceIds,
      }
    });
    if(!tempHistory){
        return res.status(404).json({error:'Data Loading error!'})
    }
    res.status(200).json(tempHistory)
}

module.exports = {
  getTempHistory,
};