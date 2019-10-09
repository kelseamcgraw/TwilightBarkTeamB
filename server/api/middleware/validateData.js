const { check, validationResult } = require('express-validator')

const blacklist = "!#$%^&*(){}[]|,<>/?-_=+;:";

const userCreate = () => {

  return [

    check('username')
            .not().isEmpty().withMessage("username cannot be empty")
            .blacklist(blacklist)
            .trim()
            .escape()
            .isString().withMessage("invalid format for username")
            .isLength(6).withMessage("username must be at leat 6 characters"),
          check("password")
            .not().isEmpty().withMessage("password cannot be empty")
            .trim()
            .matches('[0-9]').withMessage("password must contain one number")
            .matches('[a-z]').withMessage("password must contain one lowercase letter")
            .matches('[A-Z]').withMessage("password must contain one uppercase letter")
            .escape()
            .isString().withMessage("invalid format for password")
            .isLength(6).withMessage("password must be at leat 6 characters"),
          check("email")
            .blacklist(blacklist)
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

}

const updateUser = () => {

    return [

        check('username')
            .optional()
            .not().isEmpty().withMessage("username cannot be empty")
            .blacklist(blacklist)
            .trim()
            .escape()
            .isString().withMessage("invalid format for username")
            .isLength(6).withMessage("username must be at leat 6 characters"),
        check("password")
            .optional()
            .not().isEmpty().withMessage("password cannot be empty")
            .trim()
            .matches('[0-9]').withMessage("password must contain one number")
            .matches('[a-z]').withMessage("password must contain one lowercase letter")
            .matches('[A-Z]').withMessage("password must contain one uppercase letter")
            .escape()
            .isString().withMessage("invalid format for password")
            .isLength(6).withMessage("password must be at leat 6 characters"),
        check("email")
            .optional()
            .blacklist(blacklist)
            .not().isEmpty().withMessage("Email cannot be empty")
            .isEmail().withMessage("not a valid email")
            .trim()
            .escape(),
        check("phoneNumber")
            .optional()
            .blacklist(blacklist)
            .isMobilePhone().withMessage("this is not a valid phone number")
            .not().isEmpty().withMessage("Phone number cannot be empty")
            .trim()
            .escape(),
    
      ];

}

const userId = () => {

    return [

        check("userId").not().isEmpty().withMessage("userId not provided")
            .trim()
            .escape()
            .isNumeric().withMessage("not a number"),
    ]
}

const userLogin = () => {
    return [

    check('username')
        .not().isEmpty().withMessage("username cannot be empty")
        .blacklist(blacklist)
        .trim()
        .escape()
        .isString().withMessage("invalid format for username"),
    check("password")
        .not().isEmpty().withMessage("password cannot be empty")
        .trim()
        .escape()
        .isString().withMessage("invalid format for password")

    ];

}

const dogCreate = () => {

    return [

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
            .optional()
            .trim()
            .isNumeric().withMessage("dog age must be an integer")
            .escape(),
        check("breed")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for breed")
            .trim()
            .escape(),
        check("color")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for color")
            .trim()
            .escape(),
        check("size")
            .blacklist(blacklist)
            .not.isEmpty().withMessage("size cannot be empty")
            .isString().withMessage("Invalid format for size")
            .trim()
            .escape(),
        check("fileLocation")
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for fileLocation")
            .trim()
            .escape()

    ];

}

const dogId = () => {
    return [
        check("dogId")
            .isNumeric().withMessage("not a number")
            .trim()
            .escape()

    ];
}

const dogUpdate = () => {

    return [

        check('dogName')
            .optional()
            .not().isEmpty().withMessage("dog name cannot be empty")
            .blacklist(blacklist)
            .trim()
            .escape()
            .isString().withMessage("invalid format for username"),
        check("userID")
            .optional()
            .not().isEmpty().withMessage("userID cannot be empty")
            .trim()
            .escape()
            .isNumeric().withMessage("userID must be an integer"),
        check("dogAge")
            .optional()
            .trim()
            .isNumeric().withMessage("dog age must be an integer")
            .escape(),
        check("breed")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for breed")
            .trim()
            .escape(),
        check("color")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for color")
            .trim()
            .escape(),
        check("size")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for size")
            .trim()
            .escape(),
        check("fileLocation")
            .optional()
            .blacklist(blacklist)
            .isString().withMessage("Invalid format for fileLocation")
            .trim()
            .escape()

    ];
}

const validate = (req, res, next) => {

  const errors = validationResult(req)

  if (errors.isEmpty()) {

    return next()

  }

  const extractedErrors = []

  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({

    errors: extractedErrors,

  })

}

module.exports = {

  userCreate,
  userLogin,
  updateUser,
  userId,
  dogId,
  dogCreate,
  dogUpdate,
  validate,

}