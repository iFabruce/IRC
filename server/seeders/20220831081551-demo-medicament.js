'use strict';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('medicaments', [{
         nom: 'Amoxyciline-comprimé',
         description: 'loremu ipsum dolor sit amet',
         posologie: 'loremu ipsum dolor sit amet',
         fabriquant: 'laboratoir abc',
         createdAt: date,
         updatedAt: date
     },{
      nom: 'Hyconcil-buvable',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
     },{
      nom: 'Doliprane-suppositoire',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
     }], {});
     
    await queryInterface.bulkInsert('prix_medicaments', [{
      id_prestataire: 46,
      id_medicament: 37,
      prix: 4000,
      date: date,
      createdAt: date,
      updatedAt: date 
    },{
      id_prestataire: 46,
      id_medicament: 37,
      prix: 4500,
      date: date,
      createdAt: date,
      updatedAt: date 
    }],{})
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
