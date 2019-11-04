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
      id: req.params.dogId,
      userId: req.userData.id 
    } 
  
  })
  .then(dog => {
    file="/images/" + dog[0].fileName;
    res.render('dog', { 
      title: dog[0].dogName, 
      message: 'Help I am Lost', 
      file: file
    })

  })


});

router.post("/add", [authorize, upload.single('dogImage')], (req, res, next) => {
    const dog = {
      dogName: req.body.dogName,
      userID : req.userData.id,
      dogAge : parseInt(req.body.dogAge, 10),
      breed : req.body.breed,
      color : req.body.color,
      size: req.body.size,
      fileName: req.file.filename // to do get filelocation server side
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

router.post("/update", [authorize, upload.single('dogImage'), dogUpdate(), validate], (req, res, next) => {

  model.Dog.update(req.body, { 
    
    where: { 
        id: req.body.dogId,
        userId: req.userData.id
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

    where: { id: req.params.dogId} 

  })
  .then((dog) => {

    res.json({

      dog
   
    })
 
  })

});

module.exports = router;
