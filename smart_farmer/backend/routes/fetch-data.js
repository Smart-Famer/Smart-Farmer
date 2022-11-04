const express = require('express')

const { 
    createDataReading,
    getReading
} = require('../controllers/dataReadingController')


const router = express.Router()

router.post('/',createDataReading)
router.get('/:sourceId',getReading)

module.exports = router