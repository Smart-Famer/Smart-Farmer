const express = require('express')
const router = express.Router()
const {
    login,
    signup,
    getAssistants,
    detachFarm,
    attachFarm,
    updateUser,
    updatePassword
} = require('../controllers/userController')

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/update/:_id').post(updateUser)
router.route('/get-assistants').post(getAssistants)
router.route('/detach-farm').post(detachFarm)
router.route('/attach-farm').post(attachFarm)
router.route('/update-password/:_id').post(updatePassword)


module.exports=router