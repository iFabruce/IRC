const {sequelize, Utilisateur, Abonnement, Portefeuille, Compte} = require('../models')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const { query } = require('express')
const bcrypt = require('bcrypt')
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+ "-"+today.getHours()+ ":"+today.getMinutes()+ ":" + today.getSeconds();

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
        const results= await sequelize.query(`select * from rel_abonnement_utilisateurs where id_utilisateur=${id_user} and etat='en_cours'`, { type: QueryTypes.SELECT })
        if(results.length == 0){
            const abonnement = await Abonnement.findOne({where: {id: id_abonnement}})
            // user.addAbonnement(abonnement) #Mehtode alternative
            const qr= "INSERT INTO rel_abonnement_utilisateurs"+
                '(id_utilisateur, id_abonnement, etat, date_expiration,"createdAt", "updatedAt") values'+
                `(${id_user}, ${abonnement.id}, 'en_cours', now() + interval '1 month', now(), now())`
            await sequelize.query(qr);
            const utilisateur = await Utilisateur.findOne({where: {id: id_user}})
            const portefeuille = await Portefeuille.findOne({ where: {id: utilisateur.id_portefeuille} })
            console.log(portefeuille)
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
/**********INSCRIPTION************/
module.exports.signup = async(req,res) => {
    try{
        //Create 'comptes' first
        var {login, mot_de_passe, nom, prenom,telephone,reference, sexe, date_naissance, adresse, situation_matrimonial} = req.body
        const salt = await bcrypt.genSalt()
        mot_de_passe = await bcrypt.hash(mot_de_passe, salt)
        const compte = await Compte.create({login, mot_de_passe}) 
        const id_compte = compte.id
        // Then attribute id of new 'comptes' to create new 'utilisateurs' 
        var id_portefeuille
        const userToLink  = await Utilisateur.findOne({ where: {telephone: reference} })
        if(!userToLink){
            const portefeuille  = await Portefeuille.create({solde: 0.0, date_creation: date}) 
            id_portefeuille = portefeuille.id
        }else{
            id_portefeuille = await userToLink.id_portefeuille
        }
        const utilisateur = await Utilisateur.create({nom, prenom,telephone,reference,sexe, date_naissance, adresse, situation_matrimonial, id_compte, id_portefeuille})
        res.json(true)
    }
    catch(err){
        console.log(err)
        res.json(false)
    }
}

/***********CRUD FUNCTIONS*************/
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
        limit:2,
        offset: page * 2
    })
    return res.json({users, total: Math.ceil(users.count / 2)})
}

module.exports.update = async(req, res) => {
    try {
        var {nom, prenom,adresse,date_naissance, sexe, situation_matrimonial} = req.body
        const utilisateur = await Utilisateur.findOne({
            where: {id: req.params.id}
        })
        utilisateur.nom = nom,
        utilisateur.prenom = prenom
        utilisateur.adresse = adresse
        utilisateur.date_naissance = date_naissance
        utilisateur.sexe = sexe
        utilisateur.situation_matrimonial = situation_matrimonial

        await utilisateur.save()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}
module.exports.delete = async(req, res) => {
    try {
        const med = await Utilisateur.findOne({
            where: {id: req.params.id}
        })
        await med.destroy()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}

/*********OTHER FUNCTIONS*********/



// module.exports.getUserProfile = async(req,res) => {
//     try {
//         this.getCurrentUser()
//         console.log("userId:"+res.locals.userId)
//         const results= await sequelize.query(`select * from profil_utilisateurs where id=${res.locals.userId}`, { type: QueryTypes.SELECT })
//         res.json(results)
//     } catch (error) {
//         console.log(error)
//     }
// }
