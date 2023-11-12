const express = require('express')
const routerOrchid = express.Router()
const routerTableController = require('../app/controllers/OrchidController')
const { cookieAuthenticated } = require('../config/db/authenticated')
const { authenticatedAdmin } = require('../config/db/authenticatedAdmin')



routerOrchid
    .put('/:id', cookieAuthenticated,  routerTableController.put)
routerOrchid
    .delete('/:id', cookieAuthenticated,  routerTableController.delete)

routerOrchid.route("/search")
    .get(cookieAuthenticated,  routerTableController.search)

routerOrchid.route("/")
    .get(cookieAuthenticated,  routerTableController.show)
    .post(cookieAuthenticated,  routerTableController.post)

module.exports = routerOrchid