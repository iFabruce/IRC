'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Backoffice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Compte}) {
      this.belongsTo(Compte, {foreignKey: 'id_compte', as: 'comptes'})
    }
  }
  Backoffice.init({
    nom: DataTypes.STRING,
    id_compte: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'backoffices',
    modelName: 'Backoffice',
  });
  return Backoffice;
};