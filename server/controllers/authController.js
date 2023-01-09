const {sequelize, Utilisateur,Backoffice,Compte,Portefeuille} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { QueryTypes } = require('sequelize');
var date = new Date();
date = date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') ;

module.exports.signin = async(req,res) => {
    try {
        var {login,mot_de_passe,profil} = req.body
        if(login=='' || mot_de_passe== '' || profil==''){
           res.json("Veuillez remplir tous les champs.") 
        }else{
            let request = `select * from comptes where login = '${login}' and id in (select id_compte from ${profil})`
            const compte = await sequelize.query(request, { type: QueryTypes.SELECT })
            if(compte.length > 0){
                const id_compte = compte[0].id
                var user
                const compare = await bcrypt.compare(mot_de_passe,compte[0].mot_de_passe)
                if(compare){
                    if(profil == 'utilisateurs'){
                        user = await Utilisateur.findOne({
                            where: {id_compte}
                        })
                    }else if(profil == 'backoffices'){
                        user = await Backoffice.findOne({
                            where: {id_compte}
                        })
                    }
                    const id = user.dataValues.id
                    const max = 1000 * 60 * 60 * 24
                    const token = jwt.sign({id}, 'irc secret' , {expiresIn: max })
                    res.cookie('jwt',token,{maxAge: max, HttpOnly: false})
                    return res.json({profil, token})
                }else{
                    return res.json('Vérifier votre mot de passe.')
                }
        
            }
            else{//Si le compte n'existe pas dans le profil choisi
                return res.json("Ce compte n'existe pas.")
            }
        }
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}
module.exports.logout = async(req,res) => {
    try {
        res.cookie('jwt','', {maxAge: 1})
        res.json('déconnexion...')
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}