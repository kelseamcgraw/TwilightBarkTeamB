'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Dog, {foreignKey: 'userID', as: 'dogs'});
  };
  return User;
};