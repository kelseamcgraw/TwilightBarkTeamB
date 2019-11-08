const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');

const authorize = require("../middleware/check-auth");
const isAdmin = require("../middleware/check-isAdmin");
const router = express.Router();

const { userLogin, updateUser, userId, userCreate, validate } = require("../middleware/validateData");

const model = require('../../models/index');

const hashCount = 12;

router.get('/dogs', [authorize], (req, res) => {

  model.User.findAll({
    where : {
      id : req.userData.id
    },
    include: [
      {
        model:  model.Dog,
         as: "dog"
      }
    ]
  }).then(users => {

    const resObj = users.map(user => {

      return Object.assign(
        {},
        {

          userId : user.id,
          username : user.username,
          email : user.email,
          phoneNumber : user.phoneNumber,
          dogs : user.dog.map(dog => {

            return Object.assign(
              {},
              {

                dogId : dog.id,
                dogName : dog.dogName,
                userId : dog.userID,
                dogAge : dog.dogAge,
                breed : dog.breed,
                color : dog.color,
                size: dog.size,
                file : dog.fileLocation

              })

            })

          })

      });

      res.json(resObj);

  });

});

router.post("/signup", [userCreate(), validate], (req, res, next) => {

  model.User.findAll({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => {
    if(user.length > 0) {

      return res.json({

        message: "username already taken"

      });

    } else {

        //EMAIL HERE
        var app = require('express')(),
            mailer = require('express-mailer');

        mailer.extend(app, {
          from: 'roesslma@miamioh.edu',
          host: 'smtp.gmail.com', // hostname
          secureConnection: true, // use SSL
          port: 465, // port for secure SMTP
          transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
          auth: {
            user: 'roesslma@miamioh.edu',
            pass: '#ELLA3552!'
          }
        });

        //app.set('views', __dirname + '/views');
        //app.set('view engine', 'jade');

        app.get('/', function (req, res, next) {
          app.mailer.send('email', {
            to: 'roesslma@miamioh.edu', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Test Email', // REQUIRED.
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
          }, function (err) {
            if (err) {
              // handle error
              console.log(err);
              res.send('There was an error sending the email');
              return;
            }
            res.send('Email Sent');
          });
        });



        bcrypt.hash(req.body.password, hashCount, function(err, hash) {
        
        req.body.password = hash;
        req.body.isAdmin = false;
        
        model.User.create(req.body)
        .then((user) => {

          jwt.sign({ 
            id: user.id, 
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

router.post("/login", [userLogin(), validate], (req, res, next) => {

  model.User.findOne({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => { 
    if(user) {
      
      bcrypt.compare(req.body.password, user.password, (err, result) => {
  
        if(result) {
  
          jwt.sign({ 
            id: user.id, 
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

router.post("/update", [updateUser(), validate, authorize], (req, res, next) => {

  model.User.update(req.body, { 
    
    where: { id: req.userData.id } 
  
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

    where: { id: req.userData.id} 

  })
  .then((user) => {

    res.json({

      user
   
    })
 
  })

});

const generateToken = () => {}

module.exports = router;
