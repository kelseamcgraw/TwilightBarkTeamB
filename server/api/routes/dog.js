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

router.post("/update", (req, res, next) => {

  model.Dog.update(req.body, { 
    
    where: { dogName: req.body.dogName } 
  
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
  check("dogId").not().isEmpty().withMessage("dogId not provided")
  .trim()
  .escape()
  .isNumeric().withMessage("not a number"),
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
