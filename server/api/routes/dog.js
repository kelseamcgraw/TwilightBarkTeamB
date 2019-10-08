const express = require("express");
const { check, validationResult } = require('express-validator');

const authorize = require("../middleware/check-auth");
const router = express.Router();
const validateAddDog = require("../middleware/validateAddDog");

const model = require('../../models/index');

const hashCount = 12;

router.get('/dogs', (req, res) => {
  model.Dog.findAll().then(dogs => res.json(dogs));
});

router.post("/add", [validateAddDog], (req, res, next) => {

    model.Dog.create(req.body)
    .then(user => res.json({

        message: "New Dog Added"

    }))
    .catch(error => res.json({

        error: error

    }));

});

router.post("/login", (req, res, next) => {
  
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

router.delete("/delete/:dogId",  [
  check("userId").not().isEmpty().withMessage("userId not provided")
  .trim()
  .escape()
  .isNumeric().withMessage("not a number"),
  authorize
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
