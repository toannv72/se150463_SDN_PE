const express = require('express')
const routerCategory = express.Router()
const routerTableController = require('../app/controllers/CategoryController')
const { cookieAuthenticated } = require('../config/db/authenticated')
const { authenticatedAdmin } = require('../config/db/authenticatedAdmin')


routerCategory
    .put('/:id', cookieAuthenticated,  routerTableController.put)
routerCategory
    .delete('/:id', cookieAuthenticated,  routerTableController.delete)

routerCategory.route("/")
    .get(cookieAuthenticated,  routerTableController.show)
    .post(cookieAuthenticated,  routerTableController.post)

module.exports = routerCategory