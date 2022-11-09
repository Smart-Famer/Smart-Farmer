const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose=require('mongoose')

const createToken=({_id, email, user_type, first_name, second_name, location, profile_picture})=>{
    return jwt.sign({_id, email, user_type, first_name, second_name, location, profile_picture},process.env.SECRET, {expiresIn:"1d"})
}
const login = async (req,res)=>{
    data=req.body
    try{
        const user = await User.signIn(data)
        // console.log(user)
        const token = createToken(user)
        const {_id, email, user_type, first_name, second_name, location, profile_picture,farms} = user
        // console.log(farms)
        res.status(200).json({details:{
            _id, email, user_type, first_name, second_name, location, profile_picture, farms
        }, token})
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

const signup = async (req,res)=>{
    data = req.body
    try{
        const user = await User.signUp(data)
        // const token = createToken(user)
        // const {password,...newUser} = user
        res.status(200).json({...user})
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

const getAssistants = async (req, res)=>{
    const {farm_id} = req.body
    try{
        const assistants = await User.find({
            user_type:"Assistant",
            farms:farm_id
        },{_id:1,email:1,first_name:1,second_name:1,location:1,profile_picture:1})
        res.status(200).json(assistants)  
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

const detachFarm = async(req,res) =>{
    const {farm_id,user_id} = req.body
    try{
        await User.updateOne({_id:user_id},{$pullAll:{
            farms:[farm_id]
        }})
        res.status(200).json({message:"successfully removed"})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const attachFarm = async(req,res) =>{
    const {farm_id,user_id} = req.body

    try{
        if(!mongoose.Types.ObjectId.isValid(user_id)){
            throw Error("Invalid User ID")
        }
        const user = await User.findOneAndUpdate({_id:user_id},{$push:{
            farms:farm_id
        }})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = {
    login,
    signup,
    getAssistants,
    detachFarm,
    attachFarm
}
