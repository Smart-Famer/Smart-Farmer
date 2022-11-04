const { json } = require('express')
const mongoose = require('mongoose')
const testModel = require('../models/testModel')
// const get_workouts= async (req,res)=>{
//     const workouts = await Workout.find().sort({createdAt:-1}) 
//     res.status(200).json(workouts)
// }
const  createTest= async (req,res)=>{
    const {sourceId,reading}=req.body
    console.log(sourceId)
    console.log(reading)
    try{
        const workout = await testModel.create({sourceId,reading})
        res.json(workout)
    }catch(err){
        res.json({err:err.message})
    }
}
module.exports = {createTest}