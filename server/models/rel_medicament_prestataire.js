'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rel_medicament_prestataire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rel_medicament_prestataire.init({
    id_medicament: DataTypes.INTEGER,
    id_prestataire: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    tableName: 'rel_medicament_prestataires',
    modelName: 'Rel_medicament_prestataire',
  });
  return Rel_medicament_prestataire;
};