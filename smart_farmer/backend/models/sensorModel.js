const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const sensorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    sensor_type:{
        type:String,
        required:true
    },
    port:{
        type:String,
        required:true
    },

    current_reading:{
        type:new Schema(
            {
                reading:String
            },
            {
                timestamps:true
            })
    }

},{timestamps:true})

module.exports = mongoose.model('Sensor', sensorSchema)
