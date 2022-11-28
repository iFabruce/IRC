'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestataire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Medicament}) {
      this.belongsToMany(Medicament, { foreignKey: 'id_medicament',through: 'prix_medicament'})
      // this.belongsToMany(Medicament,{ foreignKey: 'id_medicament', as:'medicament', through:'rel_medicament_prestataires'})
    }
  }
  Prestataire.init({
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    ouverture: DataTypes.STRING,
    fermeture: DataTypes.STRING,
    telephone: DataTypes.STRING,
    adresse: DataTypes.STRING,
    longitude: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE
  }, {
    sequelize,
    tableName: 'prestataires',
    modelName: 'Prestataire',
  });
  return Prestataire;
};