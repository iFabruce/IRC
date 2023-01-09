const {sequelize, Backoffice, Compte,} = require('../models')
const bcrypt = require('bcrypt')

module.exports.findOne = async(req,res) => {
    const user = await Backoffice.findOne({
        where: { id_compte: req.params.id}
    })
    return user
}
module.exports.findAll = async(req,res) => {
    const users = await Backoffice.findAll()
    return users
}
module.exports.create = async(req,res) => {
    try {
        var {nom,login,mot_de_passe} = req.body 
        const salt = await bcrypt.genSalt()
        mot_de_passe = await bcrypt.hash(mot_de_passe, salt)
        const compte = await Compte.create({login, mot_de_passe}) 
        const id_compte = compte.id
        await Backoffice.create({nom,id_compte})
        res.json(true)
    } catch (error) {
        console.log(error.message)
        res.json(false)
    }
}
