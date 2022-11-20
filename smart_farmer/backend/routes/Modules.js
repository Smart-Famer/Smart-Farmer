const express = require('express')

const { 
    createSensor,
    createActuator
} = require('../controllers/addModuleController')

const {
    getSensors,
    get_ports,
    deleteSensor
} = require('../controllers/sensorController')

const {
    getActuators,
    deleteActuator
} = require('../controllers/actuatorContoller')

const {editSensor} = require('../controllers/sensorController')
const { editActuator } = require("../controllers/actuatorContoller");

const router = express.Router()

router.post('/add-sensor',createSensor)
router.post('/add-actuator',createActuator)
router.post('/get-sensors',getSensors)
router.post('/get-actuators',getActuators)
router.get('/get-ports',get_ports)
router.put('/edit-sensor',editSensor)
router.put("/edit-actuator", editActuator);
router.get("/delete-actuator/:_id", deleteActuator);
router.get("/delete-sensor/:_id", deleteSensor);



module.exports = router