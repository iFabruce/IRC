'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portefeuille extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Utilisateur}) {
      this.hasMany(Utilisateur, {foreignKey: 'id_portefeuille'})
    }
  }
  Portefeuille.init({
    // id_utilisateur: DataTypes.INTEGER,
    solde: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Portefeuille',
    tableName: 'portefeuilles'
  });
  return Portefeuille;
};