const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const userRoutes = require('./api/routes/user');
const dogRoutes = require('./api/routes/dog');
const cors = require('cors');
const db = require("./models");

app.options('/', cors());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    "access-control-allow-origin"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, PUT, POST, PATCH, DELETE, GET");
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
      next();
  }
});

db.sequelize.sync({
  force: true,
  paranoid: true
})
// Routes which should handle requests
app.use("/user", userRoutes);
app.use("/dog", dogRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
