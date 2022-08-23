'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rel_abonnement_utilisateurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_abonnement: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_utilisateur: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_expiration: {
        // allowNull: false,
        type: Sequelize.DATEONLY
      },
      etat: {
        // allowNull: false,
        
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rel_abonnement_utilisateurs');
  }
};