'use strict';
// const date = require('../date')

var today = new Date()
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('abonnements', [{
      nom: 'SILVER',
      tarif: 10000,
      portefeuille: 80000,
      description: 'Assitant h24 avec un agent hotline',
      createdAt: date,
      updatedAt: date
    },{
      nom: 'GOLD',
      tarif: 20000,
      portefeuille: 150000,
      description: 'SILVER + accompagnement psycho-social: offres exclusives naissances,... + cotisations assurances vies',
      createdAt: date,
      updatedAt: date
    },{
      nom: 'PREMIUM',
      tarif: 50000,
      portefeuille: 400000,
      description: 'Notifications/invitations pour les appels de fonds avec remboursement et intérêts',
      createdAt: date,
      updatedAt: date
    }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('abonnements', null, {});
  }
};
