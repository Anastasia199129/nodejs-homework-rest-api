const express = require('express')
const router = express.Router()
const { validation, authenticate} = require('../../middlewares')
const {joySchema} = require('../../model/user')
const authControllers = require('../../controllers/auth')
const upload = require('../../middlewares/upload')



router.post('/register', validation(joySchema), authControllers.registerController)
router.post('/login', validation(joySchema), authControllers.loginController)
router.get('/logout', authenticate, authControllers.logoutController)
router.get('/current', authenticate, authControllers.currentController)
router.patch('/avatars', authenticate, upload.single('avatar'), authControllers.updateAvatarController)
router.get('/verify/:verificationToken', authControllers.verufyController )


module.exports = router