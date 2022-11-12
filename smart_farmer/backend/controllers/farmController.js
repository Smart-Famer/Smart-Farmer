const farmModel = require('../models/farmModel')
const mongoose =require('mongoose')

const getKeys = async (req,res)=>{
    const {farm_id} = req.params
    console.log(farm_id)

    if(!mongoose.Types.ObjectId.isValid(farm_id)){
        return res.status(404).json({error:"Invalid ID"})
    }

    const farmDetails = await farmModel.findOne({_id:farm_id},{elec_conductivity_key:1,NPK_levels_key:1,weather_api_key:1})

    if(!farmDetails){
        return res.status(404).json({error:"No suche workout found"})
    }
    res.status(200).json(farmDetails)
}
//get all farms
const getAllFarms = async (req, res) => {
    console.log("getAllFarms");
    const farmList= await farmModel.find({}).sort({ createdAt: -1 });
  
    res.status(200).json(farmList);
  };

const getFarms = async (req,res)=>{
    let {farm_ids} = req.body

    farm_ids = farm_ids.filter((id)=>mongoose.Types.ObjectId.isValid(id))
    const farms = await farmModel.find({_id:{
        $in:farm_ids
    }})

    res.status(200).json(farms)
}

const createFarm = async (req,res)=>{
    const {name, location} = req.body

    try{
        if(!name || !location){
            throw Error("All fields must be filled")
        }
        const exists = await farmModel.findOne({name})
        if(exists){
            throw Error("Farm with the same name already in use")
        }

        const farm = await farmModel.create({name,location})     
        return res.status(200).json(await farmModel.updateKeys(farm._id))
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const updateFarm = async (req,res)=>{
    const {id} = req.params

    const {name} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such farm is found'})
    }

    if(await farmModel.findOne({name})){
        return res.status(400).json({error: 'farm name already exists'})
    }
    const farm = await farmModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

  if (!farm) {
    return res.status(400).json({error: 'No such farm is found'})
  }

  res.status(200).json(farm)
}

const updateSensor = async (req,res)=>{
    const {id} = req.params
    const {mode, sensor_id} = req.body
    let farm =await farmModel.findOne({_id: id})

    const includes = farm.sensors.includes(sensor_id)
    if (!farm || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such farm is found'})
    }

    if(mode==="add"){
        if(includes){
            return res.status(400).json({error: 'Sensor already Added'})
        }
        farm = await farmModel.findOneAndUpdate({_id: id}, {
            $push:{sensors:sensor_id}
        })
    }else if(mode=="delete"){
        if(!includes){
            return res.status(400).json({error: 'No such sensor associated to the farm'})
        }
        farm = await farmModel.findOneAndUpdate({_id: id}, {
            $pullAll:{
                sensors:[sensor_id]
            }
        })
    }

    res.status(200).json(farm)

}

const updateActuator = async (req,res)=>{
    const {id} = req.params
    const {mode, actuator_id} = req.body
    let farm =await farmModel.findOne({_id: id})

    const includes = farm.actuators.includes(actuator_id)
    if (!farm || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such farm is found'})
    }

    if(mode==="add"){
        if(includes){
            return res.status(400).json({error: 'Actuator already Added'})
        }
        farm = await farmModel.findOneAndUpdate({_id: id}, {
            $push:{actuators:actuator_id}
        })
    }else if(mode=="delete"){
        if(!includes){
            return res.status(400).json({error: 'No such actuator associated to the farm'})
        }
        farm = await farmModel.findOneAndUpdate({_id: id}, {
            $pullAll:{
                actuators:[actuator_id]
            }
        })
    }

    res.status(200).json(farm)

}

const deleteFarm = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such farm found'})
    }
    
      const farm = await farmModel.findOneAndDelete({_id: id})
    
      if(!farm) {
        return res.status(400).json({error: 'No such farm found'})
      }
    
      res.status(200).json(farm)
    }


module.exports={
    getKeys,
    createFarm,
    updateFarm,
    deleteFarm,
    updateSensor,
    updateActuator,
    getFarms,
    getAllFarms
}