'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Compte, Abonnement}) {
      this.belongsTo(Compte, {foreignKey: 'id_compte', as: 'comptes'})
      this.belongsToMany(Abonnement, {foreignKey: 'id_abonnement',as : 'Abonnement',  through: 'rel_abonnement_utilisateurs'})
    }
  }
  Utilisateur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    reference: DataTypes.INTEGER,
    sexe: DataTypes.STRING,
    date_naissance: DataTypes.DATEONLY,
    adresse: DataTypes.STRING,
    situation_matrimonial: DataTypes.STRING,
    id_compte: DataTypes.INTEGER,
    id_portefeuille: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'utilisateurs',
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};