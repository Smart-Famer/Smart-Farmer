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

const updateUser = async (req,res)=>{
    const data = req.body
    const {_id} = req.params
    try{
        const user = await User.updateUser({...data, _id})
        const token = createToken(user)
        // const {password,...newUser} = user
        res.status(200).json({
            details:{...user._doc},
            token
        })
            
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

//get farm manager
const getMangers = async (req, res)=>{
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
//get all managers
const getAllMangers = async (req, res) => {
    console.log("getAllManagers");
    const farmList= await User.find({user_type:"Manager"}).sort({ createdAt: -1 });
  
    res.status(200).json(farmList);
  };
  //get all assistants
const getAllAssistants = async (req, res) => {
    console.log("getAllAssistants");
    const farmList= await User.find({user_type:"Assistant"}).sort({ createdAt: -1 });
  
    res.status(200).json(farmList);
  };

  //delete a manger
const deleteManger =async (req, res)=>{

    const { _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid farm ID");
    }
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "No such manager" });
    }
console.log(user.farms);
    if(user.farms.length ==0){
        const deleteuser = await User.findOneAndDelete({ _id });
        if (!deleteuser) {
            throw Error("No such manager found");
        }
        res.status(200).json(deleteuser);
        console.log("can delete");
    }
    else{
        console.log("can not delete");
        throw Error("Can not delete manager with farms")
    }

  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};
const detachFarm = async(req,res) =>{
    console.log(req.body)
    const {farm_id,user_id} = req.body
    try{
        const user = await User.findOneAndUpdate({_id:user_id},{$pullAll:{
            farms:[farm_id]
        }})
        res.status(200).json(user)
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
        }},{new: true})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const updatePassword = async (req, res)=>{
    const data = req.body
    const {_id} = req.params
    try{
        if(!mongoose.Types.ObjectId.isValid(_id)){
            throw Error("Invalid User ID")
        }
        const user = await User.updatePass({...data,_id})
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
    attachFarm,
    updateUser,
    updatePassword,
    getAllMangers,
    getAllAssistants,
    getMangers,
    deleteManger
}
