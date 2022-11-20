const dataReadingModel = require("../models/dataReadingModel");
const mongoose = require("mongoose");

const getReadingHistory = async (req, res) => {
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
  if (duration == "monthly") {
    temp = await dataReadingModel.aggregate([
      {
        $match: { sourceId: { $in: sourceIds } },
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            sourceId: "$sourceId",
          },
          reading: { $avg: "$reading" },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    readingHistory = temp.map((e) => {
      return {
        sourceId:e._id.sourceId,
        timestamp:months[e._id.month-1],
        reading:e.reading
      }
    })
  }else{
     readingHistory = await dataReadingModel.find({
      sourceId: {
        $in: sourceIds,
      },
      timestamp:{$gte:startDate},
    }).sort({ timestamp: 1 }).limit(7*sourceIds.length);
  }

  if (!readingHistory) {
    return res.status(404).json({ error: "Data Loading error!" });
  }
  res.status(200).json(readingHistory);
};

module.exports = {
  getReadingHistory,
};
