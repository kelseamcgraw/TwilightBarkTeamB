// dogName: DataTypes.STRING,
// userID: DataTypes.INTEGER,
// dogAge: DataTypes.INTEGER,
// bree: DataTypes.STRING,
// color: DataTypes.STRING,
// size: DataTypes.STRING,
// fileLocation: DataTypes.STRING

const { check } = require('express-validator');

const blacklist = "!#@$%^&*(){}[]|,<>/?-_=+;:";

module.exports = [

        check('dogName')
            .not().isEmpty().withMessage("dog name cannot be empty")
            .blacklist(blacklist)
            .trim()
            .escape()
            .isString().withMessage("invalid format for username"),
        check("userID")
            .not().isEmpty().withMessage("userID cannot be empty")
            .trim()
            .escape()
            .isNumeric().withMessage("userID must be an integer"),
        check("dogAge")
            .trim()
            .isNumeric().withMessage("dog age must be an integer")
            .escape(),
        check("breed")
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for breed")
            .trim()
            .escape(),
        check("color")
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for color")
            .trim()
            .escape(),
        check("size")
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for size")
            .trim()
            .escape(),
        check("fileLocation")
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for fileLocation")
            .trim()
            .escape()
      
];