const {sequelize, Utilisateur, Abonnement, Portefeuille, Compte, Rel_abonnement_utilisateur} = require('../models')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const { query } = require('express')
const bcrypt = require('bcrypt');
const rel_abonnement_utilisateur = require('../models/rel_abonnement_utilisateur');
var date = new Date();
date = date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0') ;

module.exports.getLinkedUsers = async(req,res) => {
    try {
        const qr = `select * from utilisateurs where id_portefeuille IN (select id_portefeuille from utilisateurs where id=${req.params.id}) and id !=${req.params.id}` 
        const linkedUsers= await sequelize.query(qr, { type: QueryTypes.SELECT })
        res.json(linkedUsers)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports.isSubscribed = async(req,res) => {
    try {
        const user = await Utilisateur.findOne({where: {id: req.params.id}})
        const result= await Rel_abonnement_utilisateur.findOne({where: {id_portefeuille: user.id_portefeuille}})
        if(result){
            return res.json(true)
        }
        return res.json(false)

    } catch (error) {
        return res.json(error.message)
    }
}
module.exports.getUserProfile = async(req,res) => {
    try {
        const results= await sequelize.query(`select * from profil_utilisateurs where id=${req.params.id}`, { type: QueryTypes.SELECT })
        return res.json(results)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getCurrentUserInfo = async(req,res) => {
    try {
        console.log("go")
        const {token} = req.body
        console.log("TOKENA:"+token)
        if(token){
            jwt.verify(token, 'irc secret', async (err, decodedToken) => {
                // user = await Utilisateur.findOne({
                //     where: {id: decodedToken.id}
                // })
                return res.json(decodedToken.id)
            })
        }
    } catch (error) {
        console.log(error)
    }
}
/****************CASHOUT**************/
module.exports.cashout = async(req,res) => {
    //Check user wallet if amount above card
    const {amount} = req.body
    const wallet = await Portefeuille.findOne({
        id_utilisateur: req.params.id
    })
    if(wallet.solde >= amount){
        wallet.solde = wallet.solde-amount
        wallet.save()
        return res.json(true)
    }
    return res.json(false)
}

/**************SUBSCRIPTION****************/
module.exports.subscribe = async(req,res) => {
    try {
        const {token, id_abonnement} = req.body
        let id_user
        jwt.verify(token, 'irc secret', async (err, decodedToken) => {
            if(err){
                console.log("ERROR DECODED:"+err)
            }
            else{
                id_user = decodedToken.id
            }
        })
        const mainUser = await Utilisateur.findOne({where: {id: id_user}})
        const results= await sequelize.query(`select * from rel_abonnement_utilisateurs where id_portefeuille=${mainUser.id_portefeuille} and etat='en_cours'`, { type: QueryTypes.SELECT })
        if(results.length == 0){
            const abonnement = await Abonnement.findOne({where: {id: id_abonnement}})
            // user.addAbonnement(abonnement) #Mehtode alternative
            //Find all linked users
            const qr= "INSERT INTO rel_abonnement_utilisateurs"+
                '(id_portefeuille, id_abonnement, etat, date_expiration,"createdAt", "updatedAt") values'+
                `(${mainUser.id_portefeuille}, ${abonnement.id}, 'en_cours', now() + interval '1 month', now(), now())`
            await sequelize.query(qr);
         
            const portefeuille = await Portefeuille.findOne({ where: {id: mainUser.id_portefeuille} })
            portefeuille.solde = abonnement.portefeuille
            portefeuille.save()
            return res.json(true)
        }else{//A déjà un abonnement
            return res.json(false)
        }
    } catch (error) {
        console.log(error)
    }
}
/***********MODIFICATION UTILISATEUR***********/
module.exports.update = async(req, res) => {
    try {
        var {nom, prenom,adresse,date_naissance, sexe, situation_matrimonial, telephone, reference} = req.body
        const utilisateur = await Utilisateur.findOne({
            where: {id: req.params.id}
        })
        utilisateur.nom = nom
        utilisateur.prenom = prenom
        utilisateur.adresse = adresse
        utilisateur.date_naissance = date_naissance
        utilisateur.sexe = sexe
        utilisateur.situation_matrimonial = situation_matrimonial
        utilisateur.telephone = telephone
        utilisateur.reference = reference

        var message = ''
        const userToLink  = await Utilisateur.findOne({ where: {telephone: reference} })
        if(!userToLink){
            if(reference == telephone){
                const portefeuille  = await Portefeuille.create({solde: 0.0, date_creation: date}) 
                utilisateur.id_portefeuille = portefeuille.id
                message = 'unique'
            }else{
                message = 'notExist'
            }
        } 
        else{
            utilisateur.id_portefeuille = userToLink.id_portefeuille
        }
        await utilisateur.save()
        message = 'success'
        return res.json(message)
    } catch (error) {
        console.log(error)
        return res.json(error.message)      
    }
}
/**********INSCRIPTION************/
module.exports.signup = async(req,res) => {
    try{
        //Create 'comptes' first
        var {login, mot_de_passe, nom, prenom,telephone,reference, sexe, date_naissance, adresse, situation_matrimonial} = req.body
        var message =''
        const userExistAlready = await Compte.findOne({ where : {login}})
        if(!userExistAlready){
            const salt = await bcrypt.genSalt()
            mot_de_passe = await bcrypt.hash(mot_de_passe, salt)
            const compte = await Compte.create({login, mot_de_passe}) 
            const id_compte = compte.id
            // Then attribute id of new 'comptes' to create new 'utilisateurs' 

            var id_portefeuille
            const userToLink  = await Utilisateur.findOne({ where: {telephone: reference} })
            if(!userToLink){
                if(reference == telephone){
                    const portefeuille  = await Portefeuille.create({solde: 0.0, date_creation: date}) 
                    id_portefeuille = portefeuille.id
                    message = 'unique'
                }
                else{
                    message = 'notExist'
                }
            }
            else{
                id_portefeuille = userToLink.id_portefeuille
            }
            await Utilisateur.create({nom, prenom,telephone,reference,sexe, date_naissance, adresse, situation_matrimonial, id_compte, id_portefeuille})
            message = 'success'
            res.json(message)
        }
        else{//USER EXIST
            message = 'userExist'
        }
        res.json(message)
    }
    catch(err){
        console.log(err)
        res.json(err.message)
    }
}

/***********CRUD FUNCTIONS*************/
async function findByNumero(numero){
    try {
        const utilisateur = await Utilisateur.findOne({where: {numero}})
        return utilisateur
    } catch (error) {
        console.log(error)
    }
}
module.exports.findOne = async(req,res) => {
    const user = await Utilisateur.findOne({
        where: { id: req.params.id}
    })
    return res.json(user)
}
module.exports.findAll = async(req,res) => {
    const users = await Utilisateur.findAll()
    return res.json(users)
}
module.exports.findAndCountAll = async(req,res) => {
    var page = req.params.page
    if(page<0) page = 0
    const users = await Utilisateur.findAndCountAll({
        limit:10,
        offset: page * 10,
        where: {
          status: 'actif'  
        }
        ,orderBy: 'nom'
    })
    return res.json({users, total: Math.ceil(users.count / 2)})
}


module.exports.delete = async(req, res) => {
    try {
        const user = await Utilisateur.findOne({
            where: {id: req.params.id}
        })
        user.status = 'inactif'
        user.save()
        // await med.destroy()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}

/*********OTHER FUNCTIONS*********/




