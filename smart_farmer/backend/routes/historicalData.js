const express = require('express');

const {
  getTempHistory,
} = require("../controllers/historicalDataController");

const router = express.Router()

router.get('/',getTempHistory)
// router.get("/avg", getTempAvg);

module.exports = router