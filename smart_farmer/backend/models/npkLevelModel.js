const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const npkLevelSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    n: {
      type: Number,
      required: true,
    },
    p: {
      type: Number,
      required: true,
    },
    k: {
      type: Number,
      required: true,
    },
    sourceId: {
      type: String,
      required: true,
    },
  },
  {
    timeseries: {
      timeField: "timestamp",
      metaField: "sourceId",
      granularity: "hours",
    },
  }
);

module.exports = mongoose.model("npkLevel", npkLevelSchema);
