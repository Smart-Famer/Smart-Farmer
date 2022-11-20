const { json } = require("express");
const testModel = require("../models/testModel");

const createTest = async (req, res) => {
  const { sourceId, reading } = req.body;

  try {
    const workout = await testModel.create({ sourceId, reading });
    res.json(workout);
  } catch (err) {
    res.json({ err: err.message });
  }
};
module.exports = { createTest };
