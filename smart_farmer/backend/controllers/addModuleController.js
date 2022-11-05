const sensorModel = require('../models/sensorModel')
const actuatorModel = require('../models/actuatorModel')
const mongoose = require('mongoose')


const  createSensor= async (req,res)=>{
    const {sensor_type,name,port}=req.body

    console.log(sensor_type)
    console.log(name)
    console.log(port)

    try{
        const sensor = await sensorModel.create({
            sensor_type,
            name,
            port
        })
        res.json(sensor)
    }catch(err){
        res.json(err)
    }
}
const  createActuator= async (req,res)=>{
    const {actuator_type,name,port}=req.body

    console.log(actuator_type)
    console.log(name)
    console.log(port)

    try{
        const actuator = await actuatorModel.create({
            actuator_type,
            name,
            port
        })
        res.json(actuator)
    }catch(err){
        res.json(err)
    }
}
module.exports = {
    createSensor,
    createActuator
}