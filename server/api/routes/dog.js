const express = require("express");
const { check, validationResult } = require('express-validator');

const authorize = require("../middleware/check-auth");
const router = express.Router();
const isAdmin = require("../middleware/check-isAdmin");

const model = require('../../models/index');

const { dogUpdate, dogCreate, dogId, validate } = require("../middleware/validateData");


router.get('/dogs', [authorize, isAdmin], (req, res) => {
  model.Dog.findAll().then(dogs => res.json(dogs));
});

router.post("/add", [authorize, dogCreate(), validate], (req, res, next) => {

    const dog = {
      dogName: req.body.dogName,
      userID : req.userData.id,
      dogAge : parseInt(req.body.dogAge, 10),
      breed : req.body.breed,
      color : req.body.color,
      size: req.body.size,
      fileLocation: "" // to do get filelocation server side
    }
    console.log(dog);
    model.Dog.create(dog)
    .then(dog => res.json({

        message: "New Dog Added"

    }))
    .catch(error => res.json({

        error: error

    }));

});

router.post("/update", [authorize, dogUpdate(), validate], (req, res, next) => {

  model.Dog.update(req.body, { 
    
    where: { 
        id: req.body.dogId,
        userId: req.userData.id
    } 
  
  })
  .then(dog => { 

    if(dog) {

      res.json({
          message: dog
      })

    } else {

      res.json({
            
        message: dog
      
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
    dogId(),
    validate,
    isAdmin,
    authorize
], (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.Dog.destroy({ 

    where: { id: req.params.dogId} 

  })
  .then((dog) => {

    res.json({

      dog
   
    })
 
  })

});

module.exports = router;
