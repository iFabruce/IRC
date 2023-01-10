const {sequelize} = require('../models')
const { QueryTypes } = require('sequelize');

module.exports.getAllWithDetails = async(req,res) => {
    try {
        const data = await sequelize.query(`SELECT * FROM detail_codebits where status = 'en attente de validation' and id_achat in (select id_achat from codebits where validateur = ${req.params.id_utilisateur} ) `, { type: QueryTypes.SELECT })
        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}