const express = require('express')

const { 
    updateFarm,
    getFarm,
    createFarm,
    deleteFarm
} = require('../controllers/farmController')



const router = express.Router()

router.post('/update-farm/:_id',updateFarm)
router.get('/get-farm/:_id',getFarm)
router.post('/add-farm',createFarm)
router.get('/delete-farm/:_id',deleteFarm)

module.exports = router