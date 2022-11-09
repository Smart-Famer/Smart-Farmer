const express = require('express')

const { 
    createSensor,
    createActuator
} = require('../controllers/addModuleController')

const {
    getSensors,
    get_ports
} = require('../controllers/sensorController')

const {
    getActuators
} = require('../controllers/actuatorContoller')

const router = express.Router()

router.post('/add-sensor',createSensor)
router.post('/add-actuator',createActuator)
router.post('/get-sensors',getSensors)
router.post('/get-actuators',getActuators)
router.get('/get-ports',get_ports)



module.exports = router