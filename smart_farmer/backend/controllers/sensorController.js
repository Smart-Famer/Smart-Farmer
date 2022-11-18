const sensorModel = require('../models/sensorModel')
const farmModel = require('../models/farmModel')
const mongoose =require('mongoose')
const { response } = require('express')

const getSensors = async (req,res)=>{
    let {sensor_ids} = req.body

    sensor_ids = sensor_ids.filter((id)=>mongoose.Types.ObjectId.isValid(id))
    const temp_sensors = await sensorModel.find({_id:{
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
    const Temp_Sensors = (await sensorModel.find({sensor_type:"Temperature"},{port:1})).map((sensor)=>sensor.port)
    const Humidity_Sensors = (await sensorModel.find({sensor_type:"Humidity"},{port:1})).map((sensor)=>sensor.port)
    const RainFall_Sensors = (await sensorModel.find({sensor_type:"RainFall"},{port:1})).map((sensor)=>sensor.port)
    const Soil_Sensors = (await sensorModel.find({sensor_type:"Soil Humidity"},{port:1})).map((sensor)=>sensor.port)

    res.json({Temp_Sensors,Humidity_Sensors,RainFall_Sensors,Soil_Sensors})
}

const editSensor = async (req,res)=>{
        const { sensor, farm_id, farm_name } = req.body;


        const name = farm_name + "_" + sensor.name;
        const port = farm_id + "-" + sensor.port;
        const { sensor_type } = sensor;

        const sensor_ids = (
          await farmModel.findOne({ _id: farm_id }, { sensors: 1 })
        ).sensors;

        const exists_name = await sensorModel.findOne({
          _id: {
            $in: sensor_ids,
          },
          name: name,
        });
        const exists_port = await sensorModel.findOne({
          _id: {
            $in: sensor_ids,
          },
          port: port,
        });
        console.log(exists_name)
        try {
          if (exists_name) {
            throw Error("Sensor Name Already Exists");
          }
        const sensor = await sensorModel.findOneAndUpdate(
            {port},{name,sensor_type});
        //   await farmModel.updateOne(
        //     { _id: farm_id },
        //     { $push: { sensors: sensor._id } }
        //   );
          res.status(200).json(sensor);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
}

module.exports = {
  getSensors,
  get_ports,
  editSensor,
};
