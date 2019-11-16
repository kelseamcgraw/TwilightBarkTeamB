const express = require("express");

const authorize = require("../middleware/check-auth");
const router = express.Router();

const model = require('../../models/index');


router.post('/add', [authorize], (req, res) => {

    model.Dog.findOne({ where: {dogID: req.body.dogID} })
    .then((dog) => {
        if(dog === null) {
            
            res.json({
                error: "no dog found"
            })

        } else {
            req.body.breeds.forEach(element => {
                model.Dog_Breeds.create({dogID: req.body.dogID, breedID: element.breedID});
            });
            
        }
    });
        
          
});

router.post('/update', [authorize], (req, res) => {

});


module.exports = router;
