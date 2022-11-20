const express = require('express')

const { 
    getPhotos,
    deletePhoto,
    uploadImage
} = require('../controllers/photoController')


const router = express.Router()

router.get('/get-photos/:farm_id',getPhotos)
router.get('/delete-photo/:_id',deletePhoto)
router.post('/upload-image',uploadImage)
module.exports = router