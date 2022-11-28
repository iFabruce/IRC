'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prix_medicaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_prestataire: {
        type: Sequelize.INTEGER
      },
      id_medicament: {
        type: Sequelize.INTEGER
      },
      prix: {
        type: Sequelize.DOUBLE
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('prix_medicaments');
  }
};