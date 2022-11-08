const express = require('express')
const {createYield} = require('../controllers/cropYieldController')

const router = express.Router()

router.post('/',createYield)

module.exports = router
