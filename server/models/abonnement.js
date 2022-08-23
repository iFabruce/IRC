'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Abonnement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Utilisateur}) {
      this.belongsToMany(Utilisateur, {foreignKey: 'id_utilisateur',as: 'Utilisateur', through: 'rel_abonnement_utilisateurs'})
    }
  }
  Abonnement.init({
    nom: DataTypes.STRING,
    tarif: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    portefeuille: DataTypes.DOUBLE
  }, {
    sequelize,
    tableName: 'abonnements',
    modelName: 'Abonnement',
  });
  return Abonnement;
};