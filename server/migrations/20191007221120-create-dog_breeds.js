'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DogBreeds', {
      dogBreedsID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dogID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Dog',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      breedID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Breed',
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DogBreeds');
  }
};