const {sequelize, Medicament} = require('../models')
const { QueryTypes } = require('sequelize');

// module.exports.getMontantPanier = async(req,res) => {
//     try {
//         const {medicaments} = req.body
//         localStorage.setItem('total',0)
//         medicaments.forEach(async(medicament) => {
//             const qr = `SELECT prix FROM detail_medicaments WHERE id_medicament = ${medicament.id_medicament} AND id_prestataire = ${medicament.id_prestataire}`            
//             let data = await sequelize.query(qr, { type: QueryTypes.SELECT })
//             console.log("prix:"+data[0].prix)
//             localStorage.setItem('total', localStorage.getItem('total') + data[0].prix)
//             console.log("TOTAL:"+localStorage.getItem('total'))
//         });
//         return res.json(localStorage.getItem('total'))
//     } catch (error) {
//         console.log(error)
//         return res.json(false)      
//     }
// }
module.exports.getPrice = async(req,res) => {
    try {
        const {id_medicament, id_prestataire} = req.body
        const qr = `SELECT prix FROM detail_medicaments WHERE id_medicament = ${id_medicament} AND id_prestataire = ${id_prestataire}`
        const val = await sequelize.query(qr, { type: QueryTypes.SELECT })
        return res.json(val)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}
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
module.exports.findAndCountAll = async(req,res) => {
    var page = req.params.page
    if(page<=0) page = 0
    const users = await Medicament.findAndCountAll({
        limit:2,
        offset: page * 2
    })
    return res.json({users, total: Math.ceil(users.count / 2)})
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
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}

