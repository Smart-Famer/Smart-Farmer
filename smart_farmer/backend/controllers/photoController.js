const photoModel = require('../models/photoModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cloudinary = require('../utils/cloudinaryConfig')

const uploadImage = async (req,res)=>{
    const {public_id,image,farm_id, file_name, camera_angle} = req.body
  
    try{
      const result = await cloudinary.uploader.upload(image, {
          public_id: `${public_id}/${file_name}`,
          overwrite: true
      })

      const photo = await photoModel.create(
        {
            metadata:{
                farm_id,
                camera_angle
            },
            url:result.url
        })
      res.json({
          success: true,
          ...photo
      })
  }catch (e){
      res.json({
          success: false,
          msg: e.message
      });
  }
  }

// const addPhoto = async (req,res)=>{
//     const {farm_id, camera_angle,description} = req.body
//     let {filename} = req.body
//     const {farm_name} = req.params
//     try{
//         if(!farm_id || !camera_angle || !filename){
//             throw Error("Enter Farm ID, Camera Angle, File!")
//         }
//         if(!mongoose.Types.ObjectId.isValid(farm_id)){
//             throw Error("Invalid Farm ID")
//         }

//         const timestamp = new Date()
//         filename = farm_name+filename
//         const photo = photoModel.create(
//             {
//                 timestamp,
//                 filename,
//                 description,
//                 metadata:{
//                     farm_id,
//                     camera_angle
//                 }
//             })

//         res.status(200).json(photo)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }

// }

const getPhotos = async (req, res)=>{
    const {farm_id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(farm_id)){
            throw Error("Invalid Farm ID")
        }
        const photos = await photoModel.find({'metadata.farm_id':farm_id},{ sort: { timestamp : -1 }})

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