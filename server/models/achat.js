'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achat.init({
    id_utilisateur: DataTypes.INTEGER,
    status: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    tableName: 'achats',
    modelName: 'Achat',
  });
  return Achat;
};