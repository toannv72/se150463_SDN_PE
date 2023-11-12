
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Token = require('../../config/db/config');
var jwt = require('jsonwebtoken');
class homeControllers {
    index(req, res, next) {
        if (req.cookies.accessToken) {
            try {
                var data = jwt.verify(req.cookies.accessToken, Token.refreshToken);

                res.status(404).render('view/Error404',
                    {
                        login: true,
                    })
                // res.json(movies)



            } catch (err) {

                res.render('view/Error404')
            }
        } else {

            res.render('view/Error404')

        }

    }

    indexApi(req, res, next) {
        if (req.cookies.accessToken) {
            try {
                var data = jwt.verify(req.cookies.accessToken, Token.refreshToken);

                return res.status(404).json({ error: 'Not Found' });



            } catch (err) {

                return res.status(404).json({ error: 'Not Found' });
            }
        } else {

            return res.status(404).json({ error: 'Not Found' });

        }

    }
}
module.exports = new homeControllers;
