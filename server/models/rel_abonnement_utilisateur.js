'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_abonnement_utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_abonnement_utilisateur.init({
    id_abonnement: DataTypes.INTEGER,
    id_utilisateur: DataTypes.INTEGER,
    date_expiration: DataTypes.DATEONLY,
    etat: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'rel_abonnement_utilisateurs',
    modelName: 'Rel_abonnement_utilisateur',
  });
  return Rel_abonnement_utilisateur;
};