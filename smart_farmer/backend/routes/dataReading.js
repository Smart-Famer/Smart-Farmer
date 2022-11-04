const express = require('express')

const { 
    createDataReading,
} = require('../controllers/dataReadingController')

// const {createTest} = require('../controllers/testController')

const router = express.Router()

router.post('/',createDataReading)
// router.post('/test',createTest)

module.exports = router