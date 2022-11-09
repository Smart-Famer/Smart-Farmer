const express = require('express')
const router = express.Router()
const {
    login,
    signup,
    getAssistants,
    detachFarm,
    attachFarm
} = require('../controllers/userController')

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/get-assistants').post(getAssistants)
router.route('/detach-farm').post(detachFarm)
router.route('/attach-farm').post(attachFarm)


module.exports=router