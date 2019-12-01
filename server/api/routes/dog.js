const express = require("express");
const { validationResult } = require('express-validator');

const authorize = require("../middleware/check-auth");
const router = express.Router();

const model = require('../../models/index');
var upload = require('../middleware/upload');
const { dogUpdate, dogCreate, dogId, validate } = require("../middleware/validateData");


router.get('/lost/:dogId', [authorize], (req, res) => {
  model.Dog.findAll({ 
    raw:true,
    where: { 
      dogID: req.params.dogId,
      userID: req.userData.userID 
    } 
  
  })
  .then(dog => {
    file="/static/images/" + dog[0].fileLocation;
    res.render('dog', { 
      title: dog[0].dogName, 
      message: 'Help I am Lost', 
      file: file
    })

  })


});

router.get('/lost', [authorize], (req, res) => {

  model.Dog.findAll({
    where: {
      zipCode: req.userData.zipCode,
      isLost: true
    }
  }).then((dogs) => {

    res.json(dogs)

  }).catch((e) => {
    console.log(e)
  })

});

router.post("/add", [upload.single('dogImage'), authorize], (req, res, next) => {
    const dog = {
      dogName: req.body.dogName,
      userID : req.userData.userID,
      isLost: (req.body.isLost === 'true') ? true : false,
      dogAge : parseInt(req.body.dogAge, 10),
      zipCode: req.userData.zipCode,
      colors : req.body.colors,
      size: req.body.size,
      fileLocation: req.file.filename 
    }
    let parts = req.body.breeds.split(",")
    
    model.Dog.create(dog)
    .then((dog) => {
      
      try{
        parts.forEach(element => {
          if(element !== "") {
            model.Dog_Breeds.create({dogID: dog.dogID, breedID: parseInt(element, 10)})
          }
       });        
      }catch(error) {
        console.log(error);
      }
        res.json({

          dog

      })
    })
    .catch(error => res.json({

        error: error

    }));

});

router.post("/add-nouser", [upload.single('dogImage')], (req, res, next) => {
  const dog = {
    dogName: req.body.dogName,
    isLost: true,
    dogAge : parseInt(req.body.dogAge, 10),
    zipCode: req.body.zipCode,
    colors : req.body.colors,
    size: req.body.size,
    fileLocation: req.file.filename 
  }
  let parts = req.body.breeds.split(",")
  
  model.Dog.create(dog)
  .then((dog) => {
    
    try{
      parts.forEach(element => {
        if(element !== "") {
          model.Dog_Breeds.create({dogID: dog.dogID, breedID: parseInt(element, 10)})
        }
     });        
    }catch(error) {
      console.log(error);
    }
      res.json({

        dog

    })
  })
  .catch(error => res.json({

      error: error

  }));

});

router.post("/update", [authorize, upload.single('dogImage'), dogUpdate(), validate], (req, res, next) => {

  model.Dog.update(req.body, { 
    
    where: { 
        dogID: req.body.dogID,
        userID: req.userData.userID
    } 
  
  })
  .then(dog => { 

      res.json({
          message: dog
      })

  
  })
  .catch((error) => {

    res.json({
      
      error: error

    });

  });

});

router.delete("/delete/:dogId",  [authorize, validate, dogId()], (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  model.Dog.destroy({ 

    where: { 
      dogID: req.params.dogID,
      userID: req.userData.userID
    } 

  })
  .then((dog) => {

    res.json({

      dog
   
    })
 
  })

});

module.exports = router;
