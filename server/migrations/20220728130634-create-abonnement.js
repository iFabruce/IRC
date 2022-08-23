'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('abonnements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tarif: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.TEXT
      },
      portefeuille: {
        allowNull: false,
        type: Sequelize.DOUBLE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('abonnements');
  }
};