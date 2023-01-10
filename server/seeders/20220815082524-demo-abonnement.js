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
    // await queryInterface.bulkInsert('abonnements', [{
    //   nom: 'SILVER',
    //   tarif: 3000,
    //   portefeuille: 50000,
    //   description: '50 000 Ar de crédit + Assitant h24 avec un agent hotline',
    //   createdAt: date,
    //   updatedAt: date
    // },{
    //   nom: 'GOLD',
    //   tarif: 5000,
    //   portefeuille: 150000,
    //   description: '150 000 Ar de crédit+ SILVER + accompagnement psycho-social',
    //   createdAt: date,
    //   updatedAt: date
    // },{
    //   nom: 'PREMIUM',
    //   tarif: 8000,
    //   portefeuille: 400000,
    //   description: '400 000 Ar de crédit + notifications pour les appels de fonds',
    //   createdAt: date,
    //   updatedAt: date
    // }], {});

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
