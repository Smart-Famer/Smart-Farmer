const express = require('express')

const {
  createDataReading,
  getReading,
  getReadings,
  getAllReadings,
} = require("../controllers/dataReadingController");

const {
  createNpkLevel,
  getNpkLevel,
  getHistoricalNpkLevels,
} = require("../controllers/npkLevelController");

// const {createTest} = require('../controllers/testController')

const router = express.Router()

router.post('/',createDataReading)
router.get("/all/", getAllReadings);
router.get('/:sourceId',getReading)
router.post('/npklevel/',createNpkLevel)
router.get("/npklevel/historicaldata/", getHistoricalNpkLevels);
router.get('/npklevel/:sourceId',getNpkLevel)

module.exports = router