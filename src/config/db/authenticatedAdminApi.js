var jwt = require("jsonwebtoken");

var Token = require("./config");

module.exports = {
  authenticatedAdminApi: function (req, res, next) {
    if (req.cookies.accessToken) {
      try {
        var checkTokenValid = jwt.verify(req.cookies.accessToken, Token.refreshToken);
        if (checkTokenValid.user.role==='admin') {
          return next();
        }
        else {
          return res.status(403).json({ err: 'not have access', })
        }
      } catch (err) {
        return res.status(500).json({ err: err })
      }
    }
    return res.status(401).json({ 401: 'not logged in yet' })
  },
};
