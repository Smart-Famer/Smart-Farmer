const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    timestamp:{
      type:String,
      required:true
    },
    url: {
      type: String,
      required: true,
    },
    metadata:
    {
        farm_id:String,
        camera_angle:String
    }
  }
);

module.exports = mongoose.model("photo", gallerySchema);
