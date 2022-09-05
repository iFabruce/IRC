const {sequelize, Prestataire, Medicament} = require('../models')

module.exports.create = async(req,res) => {
    try {
        var {nom, description, ouverture, fermeture, statut, adresse, longitude, latitude, photo} = req.body
        const prestataire = await Prestataire.create({
            nom, description, ouverture, fermeture, statut, adresse, longitude, latitude, photo
        })
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }

}
module.exports.findOne = async(req,res) => {
    try {
        const prestataire = await Prestataire.findOne({
            where: { id: req.params.id}
        })
        return res.json(prestataire)
    } catch (error) {
        return res.json(error)      
    }
}
module.exports.findAll = async(req,res) => {
    try {
        const prestataires = await Prestataire.findAll()
        return res.json(prestataires)
    } catch (error) {
        return res.json(error)      
    }
}
module.exports.update = async(req, res) => {
    try {
        var {nom, description, ouverture, fermeture, statut, adresse, longitude, latitude, photo} = req.body
        const prestataire = await Prestataire.findOne({
            where: {id: req.params.id}
        })
        prestataire.nom = nom 
        prestataire.description = description  
        prestataire.ouverture = ouverture  
        prestataire.fermeture = fermeture  
        prestataire.statut = statut  
        prestataire.adresse = adresse  
        prestataire.longitude = longitude 
        prestataire.latitude = latitude  
        prestataire.photo = photo  
        await prestataire.save()
        return res.json('updated')
    } catch (error) {
        return res.json(error)      
    }
    
}
module.exports.delete = async(req, res) => {
    try {
        const prestataire = await Prestataire.findOne({
            where: {id: req.params.id}
        })
        await prestataire.destroy()
        return res.json('deleted')
    } catch (error) {
        return res.json(error)      
    }
}

module.exports.addMedicament = async(req, res) => {
    try {
        const qr= "INSERT INTO rel_medicament_prestataires"+
            '(id_medicament, id_prestataire, date,"createdAt", "updatedAt") values'+
        `(${req.params.id_medicament}, ${req.params.id_prestataire}, now(), now(), now())`
        console.log("REQ"+qr)
        await sequelize.query(qr)
        return res.json('added')
    } catch (error) {
        return res.json(error)      
    }
}

