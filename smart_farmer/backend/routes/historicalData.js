const express = require('express');

const {getTempHistory} = require("../controllers/historicalDataController");

const router = express.Router()

router.get('/',getTempHistory)

module.exports = router