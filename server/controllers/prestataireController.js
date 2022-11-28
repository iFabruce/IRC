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
        console.log(error)
        res.json(false)
    }
}

module.exports.getAddedMedicaments = async(req, res) => {
    try {    
        const qr= `SELECT * FROM detail_medicaments  where id_prestataire = ${req.params.id_prestataire} order by  nom_medicament asc`
        console.log("REQ"+qr)
        const results = await sequelize.query(qr, { type: QueryTypes.SELECT })
        res.json(results)
    }
    catch{}
}

module.exports.getNonAddedMedicaments = async(req, res) => {
    try {
        const qr= `SELECT * FROM medicaments where id not in (SELECT id_medicament from detail_medicaments where id_prestataire = ${req.params.id_prestataire} order by nom_medicament asc) `
        console.log("REQ"+qr)
        const results = await sequelize.query(qr, { type: QueryTypes.SELECT })
        res.json(results)
    }
    catch{}
}
module.exports.addOrChangePriceMedicament = async(req, res) => {
    try {
        const {id_medicament, id_prestataire, prix} = req.body
        // const qr= "INSERT INTO prix_medicaments"+
        //     '(id_medicament, id_prestataire, prix, date,"createdAt", "updatedAt") values'+
        // `(${id_medicament}, ${id_prestataire}, ${prix}, now(), now(), now())`
        // console.log("REQ"+qr)
        console.log(date)
        await Prix_medicament.create({id_prestataire, id_medicament, prix, date})
        return res.json(true)
    } catch (error) {
        console.log(error)
        return res.json(false)      
    }
}

module.exports.getAllAvailable = async(req, res) => {
    try {
        const medicaments = req.body
        console.log(medicaments)
        let qr = "select * from prestataires"
        let conditions = ""
        //Si l'utilisateur ajoute une ou plusieurs médicaments dans son panier
        if(medicaments.length > 0){
            medicaments.forEach((medoc,i) => {
                console.log("i:"+i)
                if(i==0){
                    conditions = conditions + ` where id_prestataire in (select id_prestataire from detail_medicaments where id_medicament=${medoc.id})` 
                }
                else{
                    conditions = conditions + ` and id_prestataire in (select id_prestataire from detail_medicaments where id_medicament=${medoc.id})` 
                }
            });
            //Nouvelle requête
            qr= "select * from prestataires where id in (select id_prestataire from detail_medicaments " + conditions + ")"
        }
        console.log("REQ"+qr)
        const val = await sequelize.query(qr, { type: QueryTypes.SELECT })
        return res.json(val)
    } catch (error) {
        console.log(error)
        return res.json("error")      
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
        console.log(error)
        return res.json('errora')      
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
        return res.json(false)      
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
        return res.json(false)      
    }
}




