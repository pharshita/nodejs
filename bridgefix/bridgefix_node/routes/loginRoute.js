const express = require('express')
const router = express.Router()
const login = require('../component/loginUser')

router.get('/', login.UserList)
router.post('/signup', login.signupUser)
router.post('/signin', login.loginUser)

module.exports = router
