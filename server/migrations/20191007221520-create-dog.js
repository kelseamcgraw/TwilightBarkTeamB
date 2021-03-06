'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Dogs', {
      dogID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dogName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dogAge: {
        type: Sequelize.INTEGER
      },
      colors: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      fileLocation: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Dogs');
  }
};