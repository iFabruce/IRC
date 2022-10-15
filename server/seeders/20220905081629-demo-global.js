'use strict';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

module.exports = {
  async up (queryInterface, Sequelize) {
    //COMPTE
    // await queryInterface.bulkInsert('comptes', [{
    //   login: 'admin',
    //   mot_de_passe: 'admin',
    //   date_creation: date,
    //   createdAt: date,
    //   updatedAt: date
    // },{
    //   login: 'user',
    //   mot_de_passe: 'user',
    //   date_creation: date,
    //   createdAt: date,
    //   updatedAt: date
    // }], {});
    
    // //BACKOFFICE
    // await queryInterface.bulkInsert('backoffices', [{
    //   id_compte: 1,
    //   createdAt: date,
    //   updatedAt: date
    // }], {});

    // //USER
    // await queryInterface.bulkInsert('utilisateurs', [{
    //   nom: 'Rakoto',
    //   prenom: 'Jean',
    //   sexe: 'homme',
    //   date_naissance : '01/04/1998',
    //   adresse: 'Analakely',
    //   situation_matrimonial: 'célibataire',
    //   id_compte: 2,
    //   createdAt: date,
    //   updatedAt: date
    // }], {});

    // await queryInterface.bulkInsert('portefeuilles', [{
    //   id_utilisateur: 1,
    //   solde: 0,
    //   createdAt: date,
    //   updatedAt: date
    // }],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
