const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const model = require('../../models/index');

router.get('/users', (req, res) => {
  model.User.findAll().then(users => res.json(users));
});

router.post("/signup", (req, res, next) => {
  // to do hash password and send token if successful
    model.User.create(req.body)
    .then(user => res.json({
      data: user,
      message: "New User Created"
    }))
    .catch(error => res.json({
      error: error
    }));
});

router.post("/login", (req, res, next) => {
  username = req.body.username;
  model.User.findOne({ 
    where: { username: username } 
  })
  .then(user => { 
  res.json(user);
    //to do bcrypt check password and send token if successful
  })
  .catch((error) => {
    res.json({
      error: error
    });
  });
});

router.delete("/delete/:userId", (req, res, next) => {

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
