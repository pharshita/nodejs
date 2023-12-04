const express = require('express')
const router = express.Router()
const signup_signin = require('../component/loginCredential')

router.get('/', signup_signin.UserList)
router.post('/signup', signup_signin.signupUser)
router.post('/signin', signup_signin.loginUser)

module.exports = router
