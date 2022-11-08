const ActuatorModel = require('../models/actuatorModel')
const mongoose =require('mongoose')

const getActuators = async (req,res)=>{
    let {actuator_ids} = req.body

    actuator_ids = actuator_ids.filter((id)=>mongoose.Types.ObjectId.isValid(id))
    const temp_actuators = await ActuatorModel.find({_id:{
        $in:actuator_ids
    }})
    const actuators = {
        "Pump":[],
        "Camera":[]
    }
    temp_actuators.forEach((actuator)=>{
        if(actuator.actuator_type==="Water Pump"){
            actuators.Pump.push(actuator)
        }else if(actuator.actuator_type==="Camera"){
            actuators.Camera.push(actuator)
        }
    })

    res.status(200).json(actuators)
}

module.exports=  {
    getActuators
}