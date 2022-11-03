const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const dataReadingSchema = new Schema(
    {
        timestamp:
        {
            type:String,
            required:true
        },
        reading:
        {
            type:String,
            required:true
        },
        sourceId:
        {
            type:String,
            required:true
        }
    },
    {
        timeseries:{
            timeField:'timestamp',
            metaField:'sourceId',
            granularity:'hours'
        }
    })

module.exports = mongoose.model('dataReading', dataReadingSchema)
