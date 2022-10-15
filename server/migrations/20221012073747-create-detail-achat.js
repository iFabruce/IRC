'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_achats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_achat: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_medicament: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      prix: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      quantite: {
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
    await queryInterface.dropTable('detail_achats');
  }
};