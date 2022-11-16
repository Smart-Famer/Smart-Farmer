const express = require('express');

const {
  getReadingHistory,
} = require("../controllers/historicalDataController");

const router = express.Router()

router.get("/", getReadingHistory);
// router.get("/avg", getTempAvg);

module.exports = router