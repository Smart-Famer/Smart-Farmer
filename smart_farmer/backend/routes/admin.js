const express = require('express')
const router = express.Router()
const {
    getAllFarms,
} = require('../controllers/farmController')

const {
    getAllMangers,
    getAllAssistants
} =require("../controllers/userController")

router.route('/').get(getAllFarms)
router.route('/get-all-mangers').get(getAllMangers)
router.route('/get-all-assistants').get(getAllAssistants)

module.exports=router