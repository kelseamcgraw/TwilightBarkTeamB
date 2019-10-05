const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        // Authorization is the header key and Bearer must be placed before the token 
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.tokenKey);
        req.userData = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            message: 'Auth failed'

        });

    }
};