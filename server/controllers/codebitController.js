const {sequelize} = require('../models')
const { QueryTypes } = require('sequelize');

module.exports.getAllWithDetails = async(req,res) => {
    try {
        const data = await sequelize.query(`SELECT * FROM detail_codebits where status`, { type: QueryTypes.SELECT })
        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}