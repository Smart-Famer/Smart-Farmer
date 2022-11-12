const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = new Schema(
    {
        timestamp:
        {
            type:Date,
            required:true
        },
        filename:
        {
            type:String,
            required:true
        },
        description:String,
        metadata:
        {
            farm_id:String,
            camera_angle:String
        }
    },
)
// {
//     timeseries:{
//         timeField:'timestamp',
//         metaField:'metadata',
//         granularity:'hours'
//     }
// }

module.exports = mongoose.model('photo', photoSchema)
