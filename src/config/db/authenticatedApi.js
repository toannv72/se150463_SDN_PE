var jwt = require("jsonwebtoken");

var Token = require("./config");

module.exports = {
  cookieAuthenticatedApi: function (req, res, next) {
 
    if (req.cookies.accessToken) {
      try {
        var checkTokenValid = jwt.verify(req.cookies.accessToken, Token.refreshToken);

      } catch (err) {
        return res.status(401).json({ 401: 'not logged in yet' })

      }
      if (checkTokenValid) {
        return next();
      }
    }
    return res.status(401).json({ 401: 'not logged in yet' })

  },
};
