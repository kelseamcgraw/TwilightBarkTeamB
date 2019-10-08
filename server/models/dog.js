'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    dogName: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    dogAge: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    fileLocation: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
  };
  return Dog;
};