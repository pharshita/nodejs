const express = require('express')
const router = express.Router()
const signup_signin = require('../component/loginCredential')

router.get('/', signup_signin.UserList)
router.post('/signup', signup_signin.signupUser)
router.post('/signin', signup_signin.loginUser)
router.get('/forgot', signup_signin.forgotPassword)

module.exports = router
