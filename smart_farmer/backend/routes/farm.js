const express = require('express')

const { 
    updateFarm,
    getFarm,
    createFarm,
    deleteFarm,
    getUserFarm,
    updateSecret
} = require('../controllers/farmController')



const router = express.Router()

router.post('/update-farm/:_id',updateFarm)
router.get('/get-farm/:_id',getFarm)
router.get('/get-user-farms/:_id',getUserFarm)
router.post('/add-farm',createFarm)
router.get('/delete-farm/:_id',deleteFarm)
router.get('/update-secret/:_id',updateSecret)


module.exports = router