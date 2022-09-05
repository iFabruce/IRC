'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Prestataire}) {
      this.belongsToMany(Prestataire,{ foreignKey: 'id_prestataire', as:'prestataire', through:'rel_medicament_prestataire'})
    }
  }
  Medicament.init({
    nom:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.TEXT,
    posologie: DataTypes.TEXT,
    fabriquant: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'medicaments',
    modelName: 'Medicament',
  });
  return Medicament;
};