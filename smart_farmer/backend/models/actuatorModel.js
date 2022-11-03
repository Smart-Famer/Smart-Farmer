const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const actuatorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    actuator_type:{
        type:String,
        required:true
    },
    port:{
        type:String,
        required:true
    },

    status:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('Actuator', actuatorSchema)
