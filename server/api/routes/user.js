const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

const authorize = require("../middleware/check-auth");
const isAdmin = require("../middleware/check-isAdmin");
const router = express.Router();

const validateUserLogin = require("../middleware/validateUserLogin")
const validateInput = require("../middleware/validateCreateUser");
const model = require('../../models/index');

const hashCount = 12;

router.get('/users',[authorize, isAdmin], (req, res) => {
  model.User.findAll().then(users => res.json(users));
});

router.post("/signup", [validateInput], (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.User.findAll({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => {
    if(user.length > 0) {

      return res.json({

        message: "username already taken"

      });

    } else {

        bcrypt.hash(req.body.password, hashCount, function(err, hash) {

        req.body.password = hash;

        model.User.create(req.body)
        .then(user => res.json({

          message: "New User Created"

        }))
        .catch(error => res.json({

          error: error

        }));

      });

    }

  });

});

router.post("/login", [validateUserLogin], (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.User.findOne({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => { 
    if(user) {
      
      let hash = bcrypt.hashSync(req.body.password, hashCount);

      bcrypt.compare(req.body.password, hash, (err, result) => {
  
        if(result) {
  
          jwt.sign({ 
            id: user.id, 
            username: user.username, 
            isAdmin: user.isAdmin,
            exp: Date.now()
           }, process.env.tokenKey, (err, token) => {
  
            if(err) {
  
              res.json({
  
                error: err
  
              });
  
            } else {
  
              res.json({
  
                message: "login success",
                token: token
              
              });
  
            }
  
          });
        
        } else {
          
          res.json({
            
            message: "username or password incorrect"
          
          });
        
        }
      
      });

    } else {

      res.json({
            
        message: "username or password incorrect"
      
      });

    }

  
  })
  .catch((error) => {

    res.json({
      
      error: error

    });

  });

});

router.delete("/delete/:userId",  [
  check("userId").not().isEmpty().withMessage("userId not provided")
  .trim()
  .escape()
  .isNumeric().withMessage("not a number"),
  authorize, 
  isAdmin
], (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.User.destroy({ 

    where: { id: req.params.userId} 

  })
  .then((user) => {

    res.json({

      user
   
    })
 
  })

});

module.exports = router;
