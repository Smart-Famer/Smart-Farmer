const cropYieldModel = require('../models/cropYieldModel')
const mongoose = require('mongoose')

const getYield = async(req,res)=>{
    const {farm_id} = req.params
    const date = new Date()
    const year = date.getFullYear()
    const start = `${year}-01-01`
    const end = `${year}-12-31`

    try {
        const yieldData = await cropYieldModel.find(
            {farm_id:farm_id,date:{$gte:start,$lte:end}},{},{sort: { 'date' : 1 } }
        )
        if(!yieldData){
            res.status(404).json({error:`No yield data for this farm in the date range of ${start} to ${end}`})
        }
        res.status(200).json(yieldData)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const createYield = async(req,res)=>{
    const {farm_id,crop_name,date,yield} = req.body
    try{
        const cropYield = await cropYieldModel.create({
            farm_id,
            crop_name,
            date,
            yield
        })
        res.json(cropYield)
    }
    catch(error){
        res.json(error)
    }
}
module.exports = {createYield,getYield}