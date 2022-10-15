'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prix_medicament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Medicament, Prestataire}) {
      // this.belongsTo(Medicament, {foreignKey: 'id_medicament'})
      // this.belongsTo(Prestataire, {foreignKey: 'id_prestataire'})

    }
  }
  Prix_medicament.init({
    id_prestataire: DataTypes.INTEGER,
    id_medicament: DataTypes.INTEGER,
    prix: DataTypes.DOUBLE,
    date: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'prix_medicaments',
    modelName: 'Prix_medicament',
  });
  return Prix_medicament;
};