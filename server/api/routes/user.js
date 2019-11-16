const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const upload = require('../middleware/upload');
const authorize = require("../middleware/check-auth");
const router = express.Router();
const isAdmin = require('../middleware/check-isAdmin');

const { userLogin, updateUser, userCreate, validate } = require("../middleware/validateData");

const model = require('../../models/index');

const hashCount = 12;

router.get('/dogs', [authorize], (req, res) => {

  model.User.findAll({
    where : {
      userID : req.userData.userID
    },
    include: [
      {
        model:  model.Dog,
         as: "dogs",
         include: [
           {
           model: model.Breed,
           as: "fk_dogID"
           }
         ]

      }
    ]
  }).then(users => {
    const resObj = users.map(user => {

      return Object.assign(
        {},
        {

          userId : user.userID,
          username : user.username,
          email : user.email,
          phoneNumber : user.phoneNumber,
          dogs : user.dogs.map(dog => {

            return Object.assign(
              {},
              {

                dogId : dog.dogID,
                dogName : dog.dogName,
                userId : dog.userID,
                dogAge : dog.dogAge,
                breed : dog.breed,
                color : dog.color,
                size: dog.size,
                file : dog.fileLocation,
                fk_dogID : dog.fk_dogID.map(breed => {
                  
                  return Object.assign(
                    {},
                    {
                      id : breed.breedID,
                      name: breed.name
                    })
                })
              })
            })
          })
      });

      res.json(users);

  });

});

router.post("/signup", [upload.none(), userCreate(), validate], (req, res, next) => {
  console.log(req.body.username)
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
        req.body.isAdmin = false;
        
        model.User.create(req.body)
        .then((user) => {

          jwt.sign({ 
            userID: user.userID, 
            username: user.username, 
            isAdmin: user.isAdmin,
            exp: Date.now()
           }, process.env.TOKEN_KEY, (err, token) => {
  
            if(err) {
  
              res.json({
  
                error: err
  
              });
  
            } else {
  
              res.json({
  
                token: token
              
              });
  
            }
  
          });

        })

      });

    }

  });

});

router.post("/login", [upload.none(), userLogin(), validate], (req, res, next) => {

  model.User.findOne({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => { 
    if(user) {
      
      bcrypt.compare(req.body.password, user.password, (err, result) => {
  
        if(result) {
  
          jwt.sign({ 
            userID: user.userID, 
            username: user.username, 
            isAdmin: user.isAdmin,
            exp: Date.now()
           }, process.env.TOKEN_KEY, (err, token) => {
  
            if(err) {
  
              res.json({
  
                error: err
  
              });
  
            } else {
  
              res.json({
  
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

router.post("/update", [authorize, upload.none(), updateUser(), validate], (req, res, next) => {

  model.User.update(req.body, { 
    
    where: { userID: req.userData.userID } 
  
  })
  .then(user => { 

    if(user) {

      res.json({
          message: user
      })

    } else {

      res.json({
            
        message: "Error"
      
      });

    }

  
  })
  .catch((error) => {

    res.json({
      
      error: error

    });

  });

});


router.delete("/delete",  [authorize], (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.User.destroy({ 

    where: { userID: req.userData.userID} 

  })
  .then((user) => {

    res.json({

      user
   
    })
 
  })

});

module.exports = router;
