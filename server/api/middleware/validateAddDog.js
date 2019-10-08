// dogName: DataTypes.STRING,
// userID: DataTypes.INTEGER,
// dogAge: DataTypes.INTEGER,
// bree: DataTypes.STRING,
// color: DataTypes.STRING,
// size: DataTypes.STRING,
// fileLocation: DataTypes.STRING

const { check } = require('express-validator');

module.exports = [

        check('dogName')
          .not().isEmpty().withMessage("dog name cannot be empty")
          .trim()
          .escape()
          .isString().withMessage("invalid format for username"),
        check("userID")
            .not().isEmpty().withMessage("userID cannot be empty")
            .trim()
            .escape()
            .isInt().withMessage("userID must be an integer"),
        check("dogAge")
            .trim()
            .isInt().withMessage("dog age must be an integer")
            .escape(),
        check("breed")
            .isString().withMessage("Invalid format for breed")
            .trim()
            .escape(),
        check("color")
            .isString().withMessage("Invalid format for color")
            .trim()
            .escape(),
        check("size")
            .isString().withMessage("Invalid format for size")
            .trim()
            .escape(),
        check("fileLocation")
            .isString().withMessage("Invalid format for fileLocation")
            .trim()
            .escape()
      
];