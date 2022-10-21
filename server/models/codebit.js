'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Codebit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Codebit.init({
    demandeur: DataTypes.INTEGER,
    validateur: DataTypes.INTEGER,
    id_achat: DataTypes.INTEGER,
    montant: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    tableName: 'codebits',
    modelName: 'Codebit',
  });
  return Codebit;
};