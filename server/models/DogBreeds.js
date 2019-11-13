'use strict';
module.exports = (sequelize, DataTypes) => {
  const DogBreeds = sequelize.define('Dog_Breeds', {
    dogBreedID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dogID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Dog',
        key: 'dogID'
      }
    },
    breedID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Breed',
        key: 'breedID'
      }
    }
  }, {});
  DogBreeds.associate = function(models) {
    // DogBreeds.belongsToMany(models.Breed, { foreignKey: 'breedID', through: 'Dog_Breeds', as: 'fk_breedID' });
    // DogBreeds.belongsToMany(models.Dog, { foreignKey: 'dogID', through: 'Dog_Breeds', as: 'fk_dogID'});
  };
  return DogBreeds;
};