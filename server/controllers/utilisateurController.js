const {sequelize, Utilisateur, Abonnement, Portefeuille} = require('../models')
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const { query } = require('express')

module.exports.findOne = async(req,res) => {
    const user = await Utilisateur.findOne({
        where: { id_compte: req.params.id}
    })
    return user
}
module.exports.findAll = async(req,res) => {
    const users = await Utilisateur.findAll()
    return users
}


module.exports.subscribe = async(req,res) => {
    try {
        const token = req.params.id_user
        console.log("JWT:"+req.cookies.jwt)
        var id_user
        jwt.verify(req.params.id_user, 'irc secret', async (err, decodedToken) => {
            // console.log(decodedToken)
            if(err){
                console.log("ERROR DECODED:"+err)
            }
            else{
                id_user = decodedToken.id

            }
        })

        // const user = await Utilisateur.findOne({where: {id: req.params.id_user}})
        console.log("USER:"+id_user)
        const results= await sequelize.query(`select * from rel_abonnement_utilisateurs where id_utilisateur=${id_user} and etat='en_cours'`, { type: QueryTypes.SELECT })
        console.log(results)
        if(results.length == 0){
            const abonnement = await Abonnement.findOne({where: {id: req.params.id_abonnement}})
            // user.addAbonnement(abonnement) #Mehtode alternative
            const qr= "INSERT INTO rel_abonnement_utilisateurs"+
            '(id_utilisateur, id_abonnement, etat, date_expiration,"createdAt", "updatedAt") values'+
        `(${id_user}, ${abonnement.id}, 'en_cours', now() + interval '1 month', now(), now())`
            console.log("REQ"+qr)
            await sequelize.query(qr);
            
            // const relation = new Rel_Abonnement_Utilisateur
            const portefeuille = await Portefeuille.findOne({where: {id_utilisateur: id_user}})
            portefeuille.solde = abonnement.portefeuille
            portefeuille.save()
            return res.json(true)
        }else{//A déjà un abonnement
            console.log("efa misy e")
            return res.json(false)
        }
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}

module.exports.getCurrentUser = async(req,res) => {
    try {
        console.log("go")
        const {token} = req.cookies.jwt
        console.log("TOKENA:"+token)
        if(token){
            jwt.verify(token, 'irc secret', async (err, decodedToken) => {
               if(err){
                    res.locals.user = null
               }else{
                    console.log("DECODED:"+decodedToken)
                    // user = await Utilisateur.findOne({
                    //     where: {id_compte: decodedToken.id}
                    // })
                    // res.json(user)
                    res.locals.userId = decodedToken.id 
               }
            })
        }else{
            console.log("user null")
            user = null
            // res.json("nullo")
        }
    } catch (error) {
        console.log(error)
        // res.json(error)
    }
}

module.exports.getUserProfile = async(req,res) => {
    try {
        this.getCurrentUser()

        console.log("userId:"+res.locals.userId)
        // const results= await sequelize.query(`select * from profil_utilisateur where id=${res.locals.userId}`, { type: QueryTypes.SELECT })
        // res.jsont(results)
    } catch (error) {
        console.log(error)
    }
}