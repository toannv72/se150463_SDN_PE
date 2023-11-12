const express = require('express')
const routerCategoryApi = express.Router()
const routerTableController = require('../app/controllers/CategoryController')
const { cookieAuthenticatedApi } = require('../config/db/authenticatedApi')



routerCategoryApi
    .put('/:id', cookieAuthenticatedApi,  routerTableController.putApi)

routerCategoryApi
    .delete('/:id', cookieAuthenticatedApi,  routerTableController.deleteApi)
    routerCategoryApi
    .get('/:id', cookieAuthenticatedApi,  routerTableController.showApiByID)

routerCategoryApi.route("/")
    .get(cookieAuthenticatedApi,  routerTableController.showApi)
    .post(cookieAuthenticatedApi,  routerTableController.postApi)

module.exports = routerCategoryApi