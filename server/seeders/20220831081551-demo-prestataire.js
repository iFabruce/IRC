'use strict';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('prestataires', [{
        nom: 'Pharmacie Nanisana',
        description: 'loremu ipsum dolor sit amet',
        ouverture: '8:30',
        fermeture: '19:00',
        statut: 'ouvert',
        adresse: 'Nanisana',
        longitude: 47.5479575,
        latitude: -18.8925451 ,
        createdAt: date,
        updatedAt: date
     },{
      nom: 'Pharmacie Anosy',
      description: 'loremu ipsum dolor sit amet',
      ouverture: '8:30',
      fermeture: '19:00',
      statut: 'ouvert',
      adresse: 'Anosy',
      longitude: 47.5579575,
      latitude: -18.8125451 ,
      createdAt: date,
      updatedAt: date
     },{
      nom: 'Pharmacie Ankadifotsy',
      description: 'loremu ipsum dolor sit amet',
      ouverture: '8:30',
      fermeture: '19:00',
      statut: 'ouvert',
      adresse: 'Ankadifotsy',
      longitude: 47.5679575,
      latitude: -18.8225451 ,
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
  }
};
