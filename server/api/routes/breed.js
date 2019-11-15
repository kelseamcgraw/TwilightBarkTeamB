const express = require("express");

const authorize = require("../middleware/check-auth");
const router = express.Router();

const model = require('../../models/index');


router.get('/breeds', [authorize], (req, res) => {
  model.Breed.findAll().then(breeds => res.json(breeds));
});



// to input breed data into database uncomment this route and hit with get request
router.get('/', [], (req, res) => {
    const dogbreeds = require('../../dogBreeds.json');
    dogbreeds.forEach(element => {
        model.Breed.create({id: element.id.substr(1), name: element.Breed})
    });
    res.json({
        message: "success"
    })
});


module.exports = router;
