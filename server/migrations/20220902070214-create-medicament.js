'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicaments', {
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
      posologie: {
        type: Sequelize.TEXT
      },
      fabriquant: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('medicaments');
  }
};