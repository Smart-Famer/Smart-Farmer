const mongoose = require('mongoose')

const Schema = mongoose.Schema

const testSchema = new Schema({
    sourceId:{
        type: String,
        required: true
    },
    reading:{
        type: Number,
        required: true
    }
},
    {timestamps: true}
)

module.exports =  mongoose.model('TestSchema',testSchema)