const express = require('express')
const routerLoginApi = express.Router()
const routerLogin = require('../app/controllers/LoginController')

routerLoginApi
    .route("/")
    .post( routerLogin.postAPI)
    

module.exports = routerLoginApi