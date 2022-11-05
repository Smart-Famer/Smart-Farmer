const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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
        const token = createToken(user)
        const {password,...newUser} = user
        res.status(200).json({details:{...newUser}, token})
    }catch(err){
        res.status(404).json({error:err.message})
    }
}

module.exports = {
    login,
    signup
}
