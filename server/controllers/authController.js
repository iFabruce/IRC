const {sequelize, Utilisateur,Compte,Portefeuille} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports.signup = async(req,res) => {
    try{
        //Create 'comptes' first
        var {login, mot_de_passe, nom, prenom, sexe, date_naissance, adresse, situation_matrimonial} = req.body
        const salt = await bcrypt.genSalt()
        mot_de_passe = await bcrypt.hash(mot_de_passe, salt)
        const compte = await Compte.create({login, mot_de_passe}) 
        const id_compte = compte.id
        // Then attribute id of new 'comptes' to create new 'utilisateurs' 
        const utilisateur = await Utilisateur.create({nom, prenom, sexe, date_naissance, adresse, situation_matrimonial, id_compte})
        const portfeuille = await Portefeuille.create({id_utilisateur: utilisateur.id, solde: 0.0 })
        return res.json(utilisateur)
    }
    catch(err){
        console.log(err)
    }
}
module.exports.signin = async(req,res) => {
    try {
        var {login,mot_de_passe} = req.body
        const compte = await Compte.findOne(
            {
                where: {login: login}            
            }
        )
        if(compte){
            const compare = await bcrypt.compare(mot_de_passe,compte.dataValues.mot_de_passe )
            if(compare){
                user = await Utilisateur.findOne({
                    where: {id_compte: compte.dataValues.id}
                })
                const id = user.dataValues.id
                const max = 1000 * 60 * 60 * 24
                const token = jwt.sign({id}, 'irc secret' , {expiresIn: max })
                res.cookie('jwt',token,{maxAge: max, HttpOnly: false})
                res.json('logged in')
            }else{
                res.json('password incorrect')
            }
        }
        else{
            res.json("Ce compte n'existe pas")
        }
    } catch (error) {
         console.log(error)
          res.status(400).json(error)
    }
}
module.exports.logout = async(req,res) => {
    try {
        res.cookie('jwt','', {maxAge: 1})
        res.json('déconnexion...')
    } catch (error) {
        
    }
}