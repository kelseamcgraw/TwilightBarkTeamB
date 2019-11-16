'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    breedID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {});
  Breed.associate = function(models) {
    Breed.belongsToMany( models.Dog, {
      through: 'Dog_Breeds',
      as: 'fk_breedID',
      foreignKey: 'breedID', 
    })

  };
  return Breed;
};