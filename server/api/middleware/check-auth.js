const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        // Authorization is the header key and Bearer must be placed before the token 
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.userData = decoded;
        next();

    } catch (error) {

        return res.status(401).json({

            message: 'Auth failed'

        });

    }
};