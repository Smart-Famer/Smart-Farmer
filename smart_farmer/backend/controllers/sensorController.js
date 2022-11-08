const SensorModel = require('../models/sensorModel')
const mongoose =require('mongoose')

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

module.exports=  {
    getSensors
}
