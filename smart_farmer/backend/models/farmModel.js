const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    sensors:[String],
    actuators:[String],

    weather_api_key:{
        type:String,
        unique:true
    },
    elec_conductivity_key:{
        type:String,
        unique:true
    },
    NPK_levels_key:{
        type:String,
        unique:true
    },



    // current_readings:{
    //     weather:{
    //         type:new Schema(
    //             {
    //                 reading:String
    //             },
    //             {
    //                 timestamps:true
    //             }),
    //     },
    //     npk_levels:{
    //         type:new Schema(
    //             {
    //                 reading:[String]
    //             },
    //             {
    //                 timestamps:true
    //             })
    //     },
    //     elect_conductivity:{
    //         type:new Schema(
    //             {
    //                 reading:[String]
    //             }, 
    //             {
    //                 timestamps:true
    //             })
    //     }
    // }

},{timestamps:true})



farmSchema.statics.updateKeys = async function(_id)
{
    await this.updateOne({_id},{
        weather_api_key:`we-${_id}`,
        elec_conductivity_key:`elec-${_id}`,
        NPK_levels_key:`npk-${_id}`
    })
    return await this.findOne({_id})

}

module.exports = mongoose.model('Farm', farmSchema)
