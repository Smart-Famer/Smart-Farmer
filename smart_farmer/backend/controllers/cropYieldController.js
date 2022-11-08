const cropYieldModel = require('../models/cropYieldModel')
const mongoose = require('mongoose')

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
module.exports = {createYield}