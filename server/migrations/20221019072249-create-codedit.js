'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('codebits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      demandeur: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      validateur: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_achat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      montant: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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
    await queryInterface.dropTable('codebits');
  }
};