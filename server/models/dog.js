'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    dogID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dogName: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    dogAge: DataTypes.INTEGER,
    isLost: DataTypes.BOOLEAN,
    colors: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    alerts: DataTypes.STRING,
    size: DataTypes.STRING,
    fileLocation: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    Dog.belongsToMany( models.Breed, {
      through: 'Dog_Breeds',
      as: 'fk_dogID',
      foreignKey: 'dogID', 
    })
  };
  return Dog;
};