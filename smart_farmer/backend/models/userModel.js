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
        type:String
    },
    location:{
        type:String,
    },
    farms:[String]

},{timestamps:true})

userSchema.statics.signUp = async function({email, password, user_type, first_name, second_name, profile_picture, location,farms=[]}){
    

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

    const user = this.create({email, password:hash, user_type, first_name, second_name, profile_picture, location,farms})
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

userSchema.statics.updateUser = async function(data){
    const {_id,email,first_name, second_name, location} = data
    if(!email || !first_name || !second_name || !location){
        throw Error("Enter all feilds")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }

    const exists = await this.findOne({
        email,
        _id:{
            $nin:[_id]
        }})
    if(exists){
        throw Error("Email already taken")
    }

    const user = await this.findOneAndUpdate({_id},{...data},{new:true})
    return user
}

userSchema.statics.updatePass = async function(data){
    const {curPass,newPass,_id}=data

    if(!curPass || !newPass){
        throw Error("Both the password cannot be empty")
    }
    
    const {password} = await this.findOne({_id})
    const match = await bcrypt.compare(curPass, password)
    if(!match){
        throw Error("Provided existing password is incorrect")
    }

    if(!validator.isStrongPassword(newPass)){
        throw Error("New Password is not Strong Enough!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPass, salt)

    const user = await this.findOneAndUpdate({_id},{password:hash},{new:true})
    return user
}

userSchema.statics.comparePass = async function(_id,password){
    const user = await this.findOne({_id})
    console.log(user)
    if(!user){
        throw Error("No such user found")
    }
    const match = await bcrypt.compare(password, user.password)
    console.log(match)
    if(!match){
        throw Error("Password Doesn't match")
    }

    return user

}
module.exports = mongoose.model('User', userSchema)