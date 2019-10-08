const { check } = require('express-validator');

const blacklist = "!#@$%^&*(){}[]|,<>/?-_=+;:";

module.exports = [

        check('username')
            .not().isEmpty().withMessage("username cannot be empty")
            .blacklist(blacklist)
            .trim()
            .escape()
            .isString().withMessage("invalid format for username")
            .isLength(5).withMessage("username must be at leat 5 characters"),
          check("password")
            .not().isEmpty().withMessage("password cannot be empty")
            .trim()
            .escape()
            .isString().withMessage("invalid format for password")
            .isLength(6).withMessage("password must be at leat 6 characters"),
          check("email")
            .blacklist("!#$%^&*(){}[]|,<>/?-_=+;:")
            .not().isEmpty().withMessage("Email cannot be empty")
            .isEmail().withMessage("not a valid email")
            .trim()
            .escape(),
          check("phoneNumber")
            .blacklist(blacklist)
            .isMobilePhone().withMessage("this is not a valid phone number")
            .not().isEmpty().withMessage("Phone number cannot be empty")
            .trim()
            .escape(),
        
      
];