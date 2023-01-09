const {sequelize, Prestataire, Medicament, Prix_medicament} = require('../models')
const { QueryTypes } = require('sequelize');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
const multer = require('multer');
const upload = multer({dest:'uploads/'}).single('demo-image');

module.exports.uploader = (req, res) => {
    upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
}

module.exports.deleteMedicament = async(req, res) => {
    const {id_prestataire, id_medicament} = req.body
    try {    
        const qr= `delete FROM prix_medicaments  where id_prestataire = ${id_prestataire} and id_medicament = ${id_medicament} `
        console.log("REQ"+qr)
        await sequelize.query(qr)
        res.json(true)
    }
    catch(error){
        console.log(error.message)
        res.json(error.message)
    }
}

//Récuperer la liste de médicaments qu'une pharmacie possède
module.exports.getAddedMedicaments = async(req, res) => {
    try {    
        const qr= `SELECT * FROM detail_medicaments  where id_prestataire = ${req.params.id_prestataire} order by  nom_medicament asc`
        console.log("REQ"+qr)
        const results = await sequelize.query(qr, { type: QueryTypes.SELECT })
        res.json(results)
    }
    catch(error){
        return res.json(error.message)
    }
}

//Récuperer la liste de médicaments qu'une pharmacie ne possède pas encore
module.exports.getNonAddedMedicaments = async(req, res) => {
    try {
        const qr= `SELECT * FROM medicaments where id not in (SELECT id_medicament from detail_medicaments where id_prestataire = ${req.params.id_prestataire} order by nom_medicament asc) `
        console.log("REQ"+qr)
        const results = await sequelize.query(qr, { type: QueryTypes.SELECT })
        res.json(results)
    }
    catch{}
}

//Ajouter ou modifier le prix d'un médicament d'un prestataire
module.exports.addOrChangePriceMedicament = async(req, res) => {
    try {
        const {id_medicament, id_prestataire, prix} = req.body
        await Prix_medicament.create({id_prestataire, id_medicament, prix, date})
        return res.json(true)
    } catch (error) {
        return res.json(error.message)      
    }
}

//Avoir toutes les prestataires disponibles en fonction du choix des médicaments
module.exports.getAllAvailable = async(req, res) => {
    try {
        const medicaments = req.body
        let qr = "select * from prestataires"
        let conditions = ""
        //Si l'utilisateur ajoute une ou plusieurs médicaments dans son panier
        if(medicaments.length > 0){
            medicaments.forEach((medoc,i) => {
                if(i==0){
                    conditions = conditions + ` where id_prestataire in (select id_prestataire from detail_medicaments where id_medicament=${medoc.id})` 
                }
                else{
                    conditions = conditions + ` and id_prestataire in (select id_prestataire from detail_medicaments where id_medicament=${medoc.id})` 
                }
            });
            qr= "select * from prestataires where id in (select id_prestataire from detail_medicaments " + conditions + ")"
        }
        const val = await sequelize.query(qr, { type: QueryTypes.SELECT })
        return res.json(val)
    } catch (error) {
        return res.json(error.message)      
    }
}
module.exports.create = async(req,res) => {
    try {
        var {nom, description, ouverture, fermeture, telephone, adresse, longitude, latitude} = req.body
        const prestataire = await Prestataire.create({
            nom, description, ouverture, fermeture, telephone, adresse, longitude, latitude
        })
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(error.message)      
    }

}
module.exports.findOne = async(req,res) => {
    try {
        const prestataire = await Prestataire.findOne({
            where: { id: req.params.id}
        })
        return res.json(prestataire)
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)      
    }
}
module.exports.findAll = async(req,res) => {
    try {
        const prestataires = await Prestataire.findAll()
        return res.json(prestataires)
    } catch (error) {
        return res.json(error.message)      
    }
}
module.exports.findAndCountAll = async(req,res) => {
    var page = req.params.page
    if(page<0) page = 0
    const users = await Prestataire.findAndCountAll({
        limit:10,
        offset: page * 10
    })
    return res.json({users, total: Math.ceil(users.count / 2)})
}

module.exports.update = async(req, res) => {
    try {
        var {nom, description, ouverture, fermeture, telephone, adresse, longitude, latitude} = req.body
        const prestataire = await Prestataire.findOne({
            where: {id: req.params.id}
        })
        prestataire.nom = nom 
        prestataire.description = description  
        prestataire.ouverture = ouverture  
        prestataire.fermeture = fermeture  
        prestataire.telephone = telephone  
        prestataire.adresse = adresse  
        prestataire.longitude = longitude 
        prestataire.latitude = latitude  
        await prestataire.save()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(error.message)      
    }
    
}
module.exports.delete = async(req, res) => {
    try {
        const prestataire = await Prestataire.findOne({
            where: {id: req.params.id}
        })
        await prestataire.destroy()
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(error.message)      
    }
}




