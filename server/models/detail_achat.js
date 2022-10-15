'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_achat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_achat.init({
    id_achat: DataTypes.INTEGER,
    id_medicament: DataTypes.INTEGER,
    prix: DataTypes.DOUBLE,
    quantite: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'detail_achats',
    modelName: 'Detail_achat',
  });
  return Detail_achat;
};