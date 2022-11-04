const express = require('express')

const { 
    createDataReading,
    getReading
} = require('../controllers/dataReadingController')

// const {createTest} = require('../controllers/testController')

const router = express.Router()

router.post('/',createDataReading)
router.get('/:sourceId',getReading)
// router.post('/test',createTest)

module.exports = router