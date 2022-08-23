'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('utilisateurs', {
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
      prenom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexe: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_naissance: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      adresse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      situation_matrimonial: {
        allowNull: false,
        type: Sequelize.STRING
      },
      id_compte: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('utilisateurs');
  }
};