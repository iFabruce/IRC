'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('portefeuilles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_utilisateur: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      solde: {
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
    await queryInterface.dropTable('portefeuilles');
  }
};