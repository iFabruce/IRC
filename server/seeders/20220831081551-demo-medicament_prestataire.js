'use strict';
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
module.exports = {
  async up (queryInterface, Sequelize) {
   
    //MEDOC
    await queryInterface.bulkInsert('medicaments', [
    {
      nom: 'Aplenzolam-comprimé',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    }, {
      nom: 'Aplenzolam-sirop',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },
    {
      nom: 'Aplenzolam-suppositoire',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },
    {
      nom: 'Tretisol-comprimé',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },
    {
      nom: 'Tretisol-suppositoire',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },
    {
      nom: 'Eprotrol-sirop',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },{
      nom: 'Ventazepam-suppositoire',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    },{
      nom: 'Nitrovirase-injectable',
      description: 'loremu ipsum dolor sit amet',
      posologie: 'loremu ipsum dolor sit amet',
      fabriquant: 'laboratoir abc',
      createdAt: date,
      updatedAt: date
    }
    ], {});
     
    //PRESTATAIRE
    await queryInterface.bulkInsert('prestataires', [{
      nom: 'Pharmacie Andoharanofotsy',
      description: 'loremu ipsum dolor sit amet',
      ouverture: '08:30',
      fermeture: '19:00',
      telephone: '0341234567',
      adresse: 'Lot IB 88 Andoharanofotsy',
      longitude: 47.53312971261252,
      latitude: -18.97990614624235 ,
      createdAt: date,
      updatedAt: date
   },{
    nom: 'Pharmacie de la RN7',
    description: 'loremu ipsum dolor sit amet',
    ouverture: '08:30',
    fermeture: '19:00',
   telephone: '0341234567',
    adresse: 'Lot IB 459 Andoharanofotsy',
    longitude: 47.5321051069825,
    latitude: -18.973468946383523 ,
    createdAt: date,
    updatedAt: date
   },{
    nom: 'Pharmacie Analakely',
    description: 'loremu ipsum dolor sit amet',
    ouverture: '08:30',
    fermeture: '19:00',
   telephone: '0341234567',
    adresse: 'Malaza',
    longitude: 47.52566815744702,
    latitude: -18.906851734767045 ,
    createdAt: date,
    updatedAt: date
   },{
    nom: 'Pharmacie Tanjombato',
    description: 'loremu ipsum dolor sit amet',
    ouverture: '08:30',
    fermeture: '19:00',
   telephone: '0341234567',
    adresse: 'Lot II A 40, Andafiatsimo Tanjombato',
    longitude: 47.526815893529985,
    latitude: -18.958710613333743 ,
    createdAt: date,
    updatedAt: date
   },{
    nom: 'Pharmacie Nanisana',
    description: 'loremu ipsum dolor sit amet',
    ouverture: '08:30',
    fermeture: '19:00',
   telephone: '0341234567',
    adresse: 'Ankadifotsy',
    longitude: 47.54857323499753,
    latitude: -18.886737318555596 ,
    createdAt: date,
    updatedAt: date
   }
  ],{})
  
   //REL MEDOC PRESTATAIRE
    await queryInterface.bulkInsert('prix_medicaments', [
      {id_prestataire: 1, id_medicament: 1, prix: 1000, date: date},
      {id_prestataire: 1, id_medicament: 2, prix: 2000, date: date},
      {id_prestataire: 1, id_medicament: 3, prix: 3000, date: date},
      {id_prestataire: 1, id_medicament: 4, prix: 4000, date: date},
      {id_prestataire: 1, id_medicament: 5, prix: 5000, date: date},
      {id_prestataire: 1, id_medicament: 6, prix: 6000, date: date},
      {id_prestataire: 1, id_medicament: 7, prix: 7000, date: date},
      {id_prestataire: 1, id_medicament: 8, prix: 8000, date: date},
      

      {id_prestataire: 2, id_medicament: 2, prix: 1100, date: date},
      {id_prestataire: 2, id_medicament: 4, prix: 2100, date: date},
      {id_prestataire: 2, id_medicament: 6, prix: 3100, date: date},
      {id_prestataire: 2, id_medicament: 8, prix: 4100, date: date},

      {id_prestataire: 3, id_medicament: 1, prix: 1200, date: date},
      {id_prestataire: 3, id_medicament: 3, prix: 2200, date: date},
      {id_prestataire: 3, id_medicament: 5, prix: 3200, date: date},
      {id_prestataire: 3, id_medicament: 7, prix: 3200, date: date},

      {id_prestataire: 4, id_medicament: 5, prix: 4300, date: date},
      {id_prestataire: 4, id_medicament: 6, prix: 5300, date: date},

      {id_prestataire: 5, id_medicament: 7, prix: 5400, date: date},
      {id_prestataire: 5, id_medicament: 8, prix: 5400, date: date}
 
  ],{})
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
