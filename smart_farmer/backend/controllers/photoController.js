const photoModel = require('../models/photoModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')



const addPhoto = async (req,res)=>{
    const {farm_id, camera_angle,description} = req.body
    let {filename} = req.body
    const {farm_name} = req.params
    try{
        if(!farm_id || !camera_angle || !filename){
            throw Error("Enter Farm ID, Camera Angle, File!")
        }
        if(!mongoose.Types.ObjectId.isValid(farm_id)){
            throw Error("Invalid Farm ID")
        }

        const timestamp = new Date()
        filename = farm_name+filename
        const photo = photoModel.create(
            {
                timestamp,
                filename,
                description,
                metadata:{
                    farm_id,
                    camera_angle
                }
            })

        res.status(200).json(photo)
    }catch(err){
        res.status(400).json({error:err.message})
    }

}

const getPhotos = async (req, res)=>{
    const {farm_id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(farm_id)){
            throw Error("Invalid Farm ID")
        }
        const photos = await photoModel.find({'metadata.farm_id':farm_id})
        console.log(photos)
        let new_photos={
            [new Date(photos[0].timestamp).toLocaleDateString().replaceAll('/','-')]:[]
        }

        photos.forEach(photo=>{
            let d = new Date(photo.timestamp).toLocaleDateString().replaceAll('/','-')
            let t = new Date(photo.timestamp).toLocaleTimeString()
            if(Object.keys(new_photos).includes(d)){
                new_photos[d].push(
                    {
                        src:photo.filename,
                        camera_angle:photo.metadata.camera_angle,
                        time:t,
                        _id:photo._id,
                        description:photo.description
                    })
            }else{
                new_photos[d]=[
                    {
                        src:photo.filename,
                        camera_angle:photo.metadata.camera_angle,
                        time:t,
                        _id:photo._id,
                        description:photo.description
                    }
                ]
            }
        })
        res.status(200).json(new_photos)
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
    addPhoto,
    getPhotos,
    deletePhoto
}