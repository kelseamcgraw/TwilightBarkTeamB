'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Dog, {foreignKey: 'userID', as: 'dog'});
  };
  return User;
};