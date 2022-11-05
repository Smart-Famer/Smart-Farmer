const express = require('express')

const { 
    createSensor,
    createActuator
} = require('../controllers/addModuleController')


const router = express.Router()

router.post('/sensor',createSensor)
router.post('/actuator',createActuator)

module.exports = router