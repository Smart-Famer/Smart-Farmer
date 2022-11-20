const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const farmSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      latitude: Number,
      longitude: Number
    },
    sensors: [String],
    actuators: [String],

    weather_api_key: {
      type: String,
    },
    elec_conductivity_key: {
      type: String,
      unique: true,
    },
    NPK_levels_key: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    secret_key:{
      type:String,
      unique:true
    }
  },
  { timestamps: true }
);

farmSchema.statics.updateKeys = async function (_id) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(_id, salt)

  await this.updateOne(
    { _id },
    {
      secret_key:hash,
      weather_api_key: `${_id}-we`,
      elec_conductivity_key: `${_id}-elec`,
      NPK_levels_key: `${_id}-npk`,
    }
  );
  return await this.findOne({ _id });
};

farmSchema.statics.updateSecret = async function(_id){
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(_id, salt)

  const farm= await this.findOneAndUpdate(
    {_id},
    {
      secret_key:hash
    },
    {new:true}
  )
  return farm
}

module.exports = mongoose.model("Farm", farmSchema);
