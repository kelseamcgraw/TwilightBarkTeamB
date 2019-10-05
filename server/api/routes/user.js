const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authorize = require("../middleware/check-auth");
const router = express.Router();
const model = require('../../models/index');

const hashCount = 12;

router.get('/users', (req, res) => {
  model.User.findAll().then(users => res.json(users));
});

router.post("/signup", (req, res, next) => {
  // to do hash password and send token if successful
  bcrypt.hash(req.body.password, hashCount, function(err, hash) {

    req.body.password = hash;

    model.User.create(req.body)
    .then(user => res.json({

      data: user,
      message: "New User Created"

    }))
    .catch(error => res.json({

      error: error

    }));

  });

});

router.post("/login", (req, res, next) => {
  
  model.User.findOne({ 
    
    where: { username: req.body.username } 
  
  })
  .then(user => { 

    let hash = bcrypt.hashSync(req.body.password, hashCount);

    bcrypt.compare(req.body.password, hash, (err, result) => {

      if(result) {
        jwt.sign({ username: req.body.username }, process.env.tokenKey, (err, token) => {

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
    
    });    //to do bcrypt check password and send token if successful
  
  })
  .catch((error) => {

    res.json({
      
      error: error

    });

  });

});

router.delete("/delete/:userId",  authorize, (req, res, next) => {

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
