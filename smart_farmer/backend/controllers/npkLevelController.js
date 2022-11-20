const npkLevelModel = require("../models/npkLevelModel");
const mongoose = require("mongoose");

const getNpkLevel = async (req, res) => {
  const { sourceId } = req.params;
  const dataReading = await npkLevelModel.findOne(
    { sourceId: sourceId },
    "sourceId n p k",
    { sort: { timestamp: -1 } }
  );
  if (!dataReading) {
    return res.status(404).json({ error: "No such source id found" });
  }
  res.status(200).json(dataReading);
};
const getHistoricalNpkLevels = async (req, res) => {
  const sourceId = req.query.sourceid;
  const duration = req.query.duration;
  // const startDate = req.query.startdate;

  // console.log(sourceId,duration,startDate)
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
    temp = await npkLevelModel.aggregate([
      {
        $match: { sourceId: sourceId },
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            sourceId: "$sourceId",
          },
          n: { $avg: "$n" },
          p: {$avg:"$p"},
          k: {$avg:"$k"}
        },
      },
      {
        $sort: {month:1}
      }
    ]);
    readingHistory = temp.map((e) => {
      return {
        sourceId: e._id.sourceId,
        timestamp: months[e._id.month-1],
        n: e.n,
        p: e.p,
        k: e.k
      };
    });
    // console.log(readingHistory_)
    // readingHistory=temp;
  } else {
    readingHistory = await npkLevelModel
      .find({
        sourceId:sourceId
      })
  }

  if (!readingHistory) {
    return res.status(404).json({ error: "Data Loading error!" });
  }
  res.status(200).json(readingHistory);
};
const createNpkLevel = async (req, res) => {
  const { timestamp, sourceId, n,p,k } = req.body;

  console.log(n,p,k);
  console.log(sourceId);
  console.log(timestamp);

  try {

    if (!/^\d+$/.test(n)) {
      throw Error("Invalid nitrogen level!!!");
    }
    if (!/^\d+$/.test(p)) {
      throw Error("Invalid posphorous level!!!");
    }
    if (!/^\d+$/.test(k)) {
      throw Error("Invalid potassium level!!!");
    }

    const dataReading = await npkLevelModel.create({
      timestamp,
      sourceId,
      n,
      p,
      k
    });
    res.json(dataReading);
  } catch (error) {
    res.json({error:error.message});
  }
};
module.exports = {
  createNpkLevel,
  getNpkLevel,
  getHistoricalNpkLevels,
};
