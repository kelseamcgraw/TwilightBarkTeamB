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
    color: DataTypes.STRING,
    alerts: DataTypes.STRING,
    size: DataTypes.STRING,
    fileName: DataTypes.STRING
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