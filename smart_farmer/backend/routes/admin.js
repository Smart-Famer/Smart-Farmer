const express = require('express')
const router = express.Router()
const {
    getAllFarms,
} = require('../controllers/farmController')

const {
    getAllMangers,
    getAllAssistants,
    deleteManger
} =require("../controllers/userController")

router.route('/get-all-farms').get(getAllFarms)
router.route('/get-all-mangers').get(getAllMangers)
router.route('/get-all-assistants').get(getAllAssistants)
router.route('/delete-manager/:_id').get(deleteManger)

module.exports=router