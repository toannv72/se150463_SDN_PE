const express = require('express')
const routerOrchidApi = express.Router()
const routerTableController = require('../app/controllers/OrchidController')
const {cookieAuthenticatedApi} = require('../config/db/authenticatedApi')





routerOrchidApi
    .put('/:id', cookieAuthenticatedApi,  routerTableController.putApi)
    .get('/:id', cookieAuthenticatedApi,  routerTableController.getOneApi)
routerOrchidApi
    .delete('/:id', cookieAuthenticatedApi,  routerTableController.deleteApi)

routerOrchidApi.route("/")
    .get(cookieAuthenticatedApi,  routerTableController.showApi)
    .post(cookieAuthenticatedApi,  routerTableController.postApi)

module.exports = routerOrchidApi