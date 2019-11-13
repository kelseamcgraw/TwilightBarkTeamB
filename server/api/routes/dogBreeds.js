const express = require("express");

const authorize = require("../middleware/check-auth");
const router = express.Router();

const model = require('../../models/index');


router.get('/add', [], (req, res) => {
  getDogs();

// model.Dog.findOne({ where: {dogID: 1} }).then((dog) => {
//     model.Breed.findOne({where: {breedID: 10}}).then((breed) => {
//       dog.addBreed([breed]);
//     });      
// });

});

async function getDogs() {
    try{
        const dog = await model.Dog.findOne({
            where: {
                dogID: 1
            }
        });
        // dog.addBreed( 45)
        
        // dog.addBreed( 1, 23)
        const db = await model.Dog_Breeds.create({dogID: 1, breedID: 2});
        await model.Dog_Breeds.create({dogID: 1, breedID: 50});

        // console.log(db);
        // const x = await dog.getBreed()
    }catch(e) {
        console.log(e)
    }
}


module.exports = router;
