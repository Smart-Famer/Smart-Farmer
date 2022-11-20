const express = require('express');

const {
  getReadingHistory,
} = require("../controllers/historicalDataController");

const router = express.Router()

router.get("/", getReadingHistory);

module.exports = router