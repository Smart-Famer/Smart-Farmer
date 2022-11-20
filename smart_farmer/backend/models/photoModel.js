const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    metadata:
    {
        farm_id:String,
        camera_angle:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("photo", gallerySchema);
