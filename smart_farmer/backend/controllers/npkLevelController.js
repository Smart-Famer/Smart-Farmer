const npkLevelModel = require("../models/npkLevelModel");
const mongoose = require("mongoose");

const getNpkLevel = async (req, res) => {
  const { sourceId } = req.params;
  // console.log(sourceId)
  const dataReading = await npkLevelModel.findOne(
    { sourceId: sourceId },
    "sourceId n p k",
    { sort: { timestamp: -1 } }
  );
  // console.log(dataReading)
  if (!dataReading) {
    return res.status(404).json({ error: "No such source id found" });
  }
  res.status(200).json(dataReading);
};
const getNpkLevels = async (req, res) => {
  const { sourceIds } = req.body;
  console.log(typeof sourceIds);
  const dataReadings = await npkLevelModel.find(
    { sourceId: { $in: sourceIds } },
    null,
    { sort: { timestamp: -1 } }
  );
  console.log(dataReadings);
  if (!dataReadings) {
    return res.status(404).json({ error: "Data transfering error" });
  }
  res.status(200).json(dataReadings);
};
const createNpkLevel = async (req, res) => {
  const { timestamp, sourceId, n,p,k } = req.body;

  console.log(n,p,k);
  console.log(sourceId);
  console.log(timestamp);

  try {
    const dataReading = await npkLevelModel.create({
      timestamp,
      sourceId,
      n,
      p,
      k
    });
    res.json(dataReading);
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  createNpkLevel,
  getNpkLevel,
  getNpkLevels,
};
