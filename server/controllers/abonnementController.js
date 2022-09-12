const {sequelize, Abonnement} = require('../models')

module.exports.create = async(req,res) => {
    const abonnement = await Abonnement.create({
        
    })
    return res.json(abonnement)
}
module.exports.findOne = async(req,res) => {
    const abonnement = await Abonnement.findOne({
        where: { id_compte: req.params.id}
    })
    return res.json(abonnement)
}
module.exports.findAll = async(req,res) => {
    const abonnements = await Abonnement.findAll()
    return res.json(abonnements)
}
