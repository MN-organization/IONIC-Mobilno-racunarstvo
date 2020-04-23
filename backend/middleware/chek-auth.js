const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.query.auth;
        const decodedToken = jwt.verify(token, 'marko_kastratovic_nemanja_kontic');
        req.token = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    }catch (error) {
        res.status(401).json({poruka: 'Autentikacija nije uspesna!!!'});
    }
};
