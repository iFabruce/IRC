const {sequelize, Utilisateur,Backoffice,Compte,Portefeuille} = require('../models')
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
        res.json(true)
    }
    catch(err){
        console.log(err)
        res.json(false)
    }
}

module.exports.signin = async(req,res) => {
    try {
        var {login,mot_de_passe,profil} = req.body
        const compte = await Compte.findOne(
            {
                where: {login}            
            }
        )
        const id_compte = compte.dataValues.id
        console.log("ID COMPTE:"+id_compte)
        if(compte){
            var user
            const compare = await bcrypt.compare(mot_de_passe,compte.dataValues.mot_de_passe)
            var message
            console.log("aaa:"+profil)
            if(compare){

                if(profil == 'Utilisateur'){
                    console.log("to user")
                    user = await Utilisateur.findOne({
                        where: {id_compte}
                    })
                    message = "to user"
                }else if(profil == 'Administrateur'){
                    console.log("to admin")

                    user = await Backoffice.findOne({
                        where: {id_compte}
                    })
                    message = "to admin"
                }
                    
                console.log("xx")
                const id = user.dataValues.id
                console.log("yy")

                const max = 1000 * 60 * 60 * 24
                const token = jwt.sign({id}, 'irc secret' , {expiresIn: max })
                res.cookie('jwt',token,{maxAge: max, HttpOnly: false})
                res.json(message)
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