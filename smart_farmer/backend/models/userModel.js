const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')


const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    second_name:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

},{timestamps:true})

userSchema.statics.signUp = async function({email, password, user_type, first_name, second_name, profile_picture, location}){
    

    //validation

    if(!email || !password){
        throw Error("All fields must be filled")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({email, password:hash, user_type, first_name, second_name, profile_picture, location})
    return user
}

userSchema.statics.signIn = async function({email, password}){
    if(!email || !password){
        throw Error("Enter both username and password")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Invalid Password")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("Account Doesn't Exists")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }
    return user
}

module.exports = mongoose.model('User', userSchema)