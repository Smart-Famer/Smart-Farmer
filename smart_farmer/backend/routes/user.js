const express = require('express')
const router = express.Router()
const {
    login,
    signup,
    getAssistants,
    getMangers,
    detachFarm,
    attachFarm,
    updateUser,
    updatePassword,
    checkPassword
} = require('../controllers/userController')

router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/update/:_id').post(updateUser)
router.route('/get-assistants').post(getAssistants)
router.route('/get-managers').post(getMangers)
router.route('/detach-farm').post(detachFarm)
router.route('/attach-farm').post(attachFarm)
router.route('/update-password/:_id').post(updatePassword)
router.route('/check-password/').post(checkPassword)


module.exports=router