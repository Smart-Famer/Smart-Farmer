const photoModel = require('../models/photoModel')
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinaryConfig')

const uploadImage = async (req,res)=>{
    const {public_id,image,farm_id, file_name, camera_angle, timestamp} = req.body
  
    try{
      const result = await cloudinary.uploader.upload(image, {
          public_id: `${public_id}/${file_name}`,
          overwrite: true
      })

      const photo = await photoModel.create(
        {
            timestamp,
            metadata:{
                farm_id,
                camera_angle
            },
            url:result.url
        })
      res.status(200).json({
          success: true,
          ...photo
      })
  }catch (e){
      res.status(400).json({
          success: false,
          msg: e.message
      });
  }
  }

const getPhotos = async (req, res)=>{
    const {farm_id} = req.params
    const {limit} = req.query
    try{
        if(!mongoose.Types.ObjectId.isValid(farm_id)){
            throw Error("Invalid Farm ID")
        }
        let photos=[]
        if(limit){
            photos = await photoModel.find({'metadata.farm_id':farm_id},null,{ sort: { timestamp : -1 }}).limit(limit)
        }else{
            photos = await photoModel.find({'metadata.farm_id':farm_id},null,{ sort: { timestamp : -1 }})
        }
        res.status(200).json(photos)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const deletePhoto = async (req, res)=>{
    const {_id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw Error("Invalid Farm ID")
        }

        const photo = await photoModel.findOneAndDelete({_id})
        if(!photo){
            throw Error("No Such Photo Found!")
        }

        res.status(200).json(photo)
    }catch(err){
        res.status(404).json({error:err.message})
    }
}
module.exports = {
    getPhotos,
    deletePhoto,
    uploadImage,
}