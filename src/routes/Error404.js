const express = require('express')
const routerHome = express.Router()
const ErrorController = require('../app/controllers/ErrorController') 

routerHome
.get('/', ErrorController.index)
.post('/', ErrorController.index)
.put('/', ErrorController.index)
.delete('/', ErrorController.index)

module.exports = routerHome