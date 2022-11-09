const SensorModel = require('../models/sensorModel')
const mongoose =require('mongoose')
const { response } = require('express')

const getSensors = async (req,res)=>{
    let {sensor_ids} = req.body

    sensor_ids = sensor_ids.filter((id)=>mongoose.Types.ObjectId.isValid(id))
    const temp_sensors = await SensorModel.find({_id:{
        $in:sensor_ids
    }})
    const sensors = {
        "Temperature":[],
        "Humidity":[],
        "RainFall":[],
        "Soil":[]
    }
    temp_sensors.forEach((sensor)=>{
        if(sensor.sensor_type==="Temperature"){
            sensors.Temperature.push(sensor)
        }else if(sensor.sensor_type==="Humidity"){
            sensors.Humidity.push(sensor)
        }else if(sensor.sensor_type==="RainFall"){
            sensors.RainFall.push(sensor)
        }else if(sensor.sensor_type==="Soil Humidity"){
            sensors.Soil.push(sensor)
        }
    })

    res.status(200).json(sensors)
}

const get_ports= async (req, res)=>{
    const Temp_Sensors = (await SensorModel.find({sensor_type:"Temperature"},{port:1})).map((sensor)=>sensor.port)
    const Humidity_Sensors = (await SensorModel.find({sensor_type:"Humidity"},{port:1})).map((sensor)=>sensor.port)
    const RainFall_Sensors = (await SensorModel.find({sensor_type:"RainFall"},{port:1})).map((sensor)=>sensor.port)
    const Soil_Sensors = (await SensorModel.find({sensor_type:"Soil Humidity"},{port:1})).map((sensor)=>sensor.port)

    res.json({Temp_Sensors,Humidity_Sensors,RainFall_Sensors,Soil_Sensors})
}

module.exports=  {
    getSensors,
    get_ports
}
