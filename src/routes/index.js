const routerLogin = require("./login");
const routerReg = require("./reg");
const routerHome = require("./home");
const router404 = require("./Error404");
const routerLogout = require("./logout");
const routerOrchid = require("./orchid");
const routerCategory = require("./category");
const routerAccount = require("./Account");
const routerLoginApi = require("./loginApi");
const routerOrchidApi = require("./orchidApi");
const routerCategoryApi = require("./categoryApi");
const Error404Api = require("./Error404Api");

module.exports = function (app) {
  app.use('/api/login', routerLoginApi)
  app.use('/api/categories', routerCategoryApi)
  app.use('/api/*', Error404Api)
  
  app.use('/products', routerOrchid)

  app.use('/login', routerLogin)
  app.use('/logout', routerLogout)
  app.use('/reg', routerReg)
  app.use('/category', routerCategory)
  app.use('/account', routerAccount)
  app.use('/', routerHome)
  app.use('*', router404)
  
};