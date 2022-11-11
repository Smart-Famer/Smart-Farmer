const express = require('express')

const { 
    addPhoto,
    getPhotos,
    deletePhoto
} = require('../controllers/photoController')

// const {createTest} = require('../controllers/testController')

const router = express.Router()

router.post('/add-photo/:farm_name',addPhoto)
router.get('/get-photos/:farm_id',getPhotos)
router.get('/delete-photo/:_id',deletePhoto)
// router.post('/temp',(req,res)=>{console.log(req.body.timestamp);})
// router.post('/hum',(req,res)=>{console.log(req.body.reading);})
// router.post('/rain',(req,res)=>{console.log(req.body.reading);})
// router.post('/test',createTest)

module.exports = router