const express = require('express')
const router = express.Router()
const {
    getKeys,
    createFarm,
    updateFarm,
    deleteFarm,
    updateSensor,
    updateActuator,
    getFarms,
} = require('../controllers/farmController')

router.route('/get-keys/:farm_id').get(getKeys)
router.route('/get-farms').post(getFarms)
router.route('/create-farm').post(createFarm)
router.route('/update-farm/:id').patch(updateFarm)
router.route('/delete-farm/:id').delete(deleteFarm)
router.route('/:id/update-sensors').patch(updateSensor)
router.route('/:id/update-actuators').patch(updateActuator)


module.exports=router