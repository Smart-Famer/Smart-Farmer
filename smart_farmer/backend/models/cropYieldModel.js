const mongoose = require('mongoose')
const schema = mongoose.Schema

const cropYieldSchema = new mongoose.Schema({
    farm_id:{
        type:String,
        required:true
    },
    crop_name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    yield:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('cropYield',cropYieldSchema)