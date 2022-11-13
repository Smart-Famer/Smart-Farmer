const dataReadingModel = require("../models/dataReadingModel");
const mongoose = require("mongoose");

// const getTempAvg = async (req, res) => {
//   const source_ids = req.query.sourceids;
//   const sourceIds = source_ids.split(",");
//   const duration = req.query.duration;
//   console.log(sourceIds, duration);
//   const tempHistory = await dataReadingModel.aggregate([
//     {
//       $match: {sourceId: {$in: sourceIds}},
//     },
//     {
//       $group: {
//         _id: { month:{$month:"$timestamp"}, sourceId:"$sourceId" },
//         avgReading: { $avg: "$reading" },
//       },
//     },
//   ]);
//   if (!tempHistory) {
//     return res.status(404).json({ error: "Data Loading error!" });
//   }
 
//   res.status(200).json(tempHistory);
// };
const getTempHistory = async (req, res) => {
  const source_ids = req.query.sourceids;
  const sourceIds = source_ids.split(",");
  const duration = req.query.duration;
  const startDate = req.query.startdate;
  let tempHistory = null;
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
  if(duration=="monthly"){
  temp = await dataReadingModel.aggregate([
      {
        $match: { sourceId: { $in: sourceIds } },
      },
      {
        $group: {
          _id: {year:{$year:"$timestamp"}, month: {$month: "$timestamp" }, sourceId: "$sourceId" },
          reading: { $avg: "$reading" },
        },
      },
    ]);
    tempHistory=temp.map((e)=>{
      return {
        sourceId:e._id.sourceId,
        timestamp:months[e._id.month],
        reading:e.reading
      }
    })
    // console.log(tempHistory_)
    // tempHistory=temp;
  }else{
     tempHistory = await dataReadingModel.find({
      sourceId: {
        $in: sourceIds,
      },
      timestamp:{$gte:startDate}
    }).limit(8*sourceIds.length);
  }
  
  if (!tempHistory) {
    return res.status(404).json({ error: "Data Loading error!" });
  }
  res.status(200).json(tempHistory);
};

module.exports = {
  getTempHistory,
};
