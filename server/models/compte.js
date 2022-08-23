'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Utilisateur}) {
      this.hasOne(Utilisateur, {foreignKey: 'id_compte', as: 'utilisateurs'})
    }
  }
  Compte.init({
    login: DataTypes.STRING,
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate:{
      //     isNull: { msg: 'Veuillez remplir votre identifiant'},
      //     isEmpty: { msg: 'Veuillez remplir votre identifiant'}
      // }
    },

    date_creation: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'comptes',
    modelName: 'Compte',
  });
  return Compte;
};