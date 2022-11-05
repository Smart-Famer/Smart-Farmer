const express = require('express')

const { 
    createDataReading,
    getReading,
    getReadings
} = require('../controllers/dataReadingController')

// const {createTest} = require('../controllers/testController')

const router = express.Router()

router.post('/',createDataReading)
router.get('/:sourceId',getReading)
router.post('/get-readings/:sourceId',getReadings)
// router.post('/temp',(req,res)=>{console.log(req.body.timestamp);})
// router.post('/hum',(req,res)=>{console.log(req.body.reading);})
// router.post('/rain',(req,res)=>{console.log(req.body.reading);})
// router.post('/test',createTest)

module.exports = router