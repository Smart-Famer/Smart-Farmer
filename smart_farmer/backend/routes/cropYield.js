const express = require('express')
const {createYield,getYield} = require('../controllers/cropYieldController')

const router = express.Router()

router.post('/',createYield)
router.get('/:farm_id',getYield)

module.exports = router
