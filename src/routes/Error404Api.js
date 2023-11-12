const express = require('express')
const Error404Api = express.Router()
const ErrorController = require('../app/controllers/ErrorController')

Error404Api
    .get('/', ErrorController.indexApi)
    .post('/', ErrorController.indexApi)
    .put('/', ErrorController.indexApi)
    .delete('/', ErrorController.indexApi)

module.exports = Error404Api