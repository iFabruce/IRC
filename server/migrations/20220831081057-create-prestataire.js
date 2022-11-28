'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prestataires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      ouverture: {
        type: Sequelize.STRING
      },
      fermeture: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prestataires');
  }
};