const {sequelize, Medicament} = require('../models')

module.exports.create = async(req,res) => {
    try {
        var {nom, description, posologie, fabriquant} = req.body
        const med = await Medicament.create({
            nom, description, posologie, fabriquant
        })
        return res.json(true)

    } catch (error) {
        console.log(error)
        return res.json(false)      
    }

}
module.exports.findOne = async(req,res) => {
    try {
        const med = await Medicament.findOne({
            where: { id: req.params.id}
        })
        return res.json(med)
    } catch (error) {
        return res.json(error)      
    }
}
module.exports.findAll = async(req,res) => {
    try {
        const meds = await Medicament.findAll()
        return res.json(meds)
    } catch (error) {
        return res.json(error)      
    }
}
module.exports.update = async(req, res) => {
    try {
        var {nom, description, posologie, fabriquant} = req.body
        const medicament = await Medicament.findOne({
            where: {id: req.params.id}
        })
        medicament.nom = nom,
        medicament.description = description
        medicament.posologie = posologie
        medicament.fabriquant = fabriquant
        await medicament.save()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
    
}
module.exports.delete = async(req, res) => {
    try {
        const med = await Medicament.findOne({
            where: {id: req.params.id}
        })
        await med.destroy()
        return res.json('deleted')
    } catch (error) {
        return res.json(error)      
    }
}

