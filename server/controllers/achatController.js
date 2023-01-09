const {sequelize, Achat, Detail_achat, Portefeuille, Utilisateur, Codebit, Prestataire} = require('../models')
const { QueryTypes } = require('sequelize');
var pdf = require('html-pdf');
var date = new Date();
date = date.getFullYear() + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0')

//Required package
var fs = require("fs");

// Read HTML Template
function base64_encode(file) {
    return "data:image/gif;base64,"+fs.readFileSync(file, 'base64');
}
var base64str = base64_encode('logo.png');

module.exports.export_pdf = async(req,res) => {
    const {panier, num_facture, id_utilisateur, totalPanier, id_prestataire} = req.body
    const prestataire = await Prestataire.findOne({where : { id: id_prestataire}})
    const utilisateur= await sequelize.query(`select * from profil_utilisateurs where id=${id_utilisateur}`, { type: QueryTypes.SELECT })
    console.log("usero:"+utilisateur[0])
    let table=""
    table += `
    <div style='padding: 5%'>
        <img src=${base64str}/> <br>
        <p>Numero facture: <strong>REF-${num_facture}</strong></p>
        <p>Nom et prénom du bénéficiaire: <strong>${utilisateur[0].nom} ${utilisateur[0].prenom}</strong></p>
        <p>Adresse du bénéficiaire: <strong>${utilisateur[0].adresse}</strong></p>
        <p>Nom du prestataire de soin: <strong>${prestataire.nom}</strong></p>
        <p>Adresse du prestataire de soin: <strong>${prestataire.adresse}</strong></p>
        <p>Date de la facture: <strong>${date}</strong></p>
    `
    table += "<table border='1' style='width:100%;word-break:break-word;border-collapse: collapse;padding:5px;border-spacing:30px'>";
    table += "<tr style='background: #0399BC'>";
    table += "<th >Medicament</th>";
    table += "<th  style='width: 100px' >Quantité</th>";
    table += "</tr> <br>";
   
    
    panier.map(row => {
        table+='<tr>'
        table += `<td>${row.nom}</td>`
        table += `<td align='center'>${row.quantite}</td>`
        table+='<tr>'
    })
    table += ` 
    </table>
    <h4>Total: ${(parseInt(totalPanier)).toLocaleString()} Ar</h4>
    </div>
`
    var options = {
        "format": "A4",
        "orientation": "portrait",
        "border": {
       
    },
    "timeout": "120000"
    };
    pdf.create(table, options).toFile(`./downloads/facture-n${num_facture}.pdf`, async function(err, result) {
        if (err) {
                console.log(err);
                return false
        }else{
            console.log("pdf create");
            return true
        }
    });
}

module.exports.getDetail_achat = async(req,res) => {
    try {
        const data = await sequelize.query(`select * from vue_detail_achats where id_achat = ${req.params.id_achat}`, { type: QueryTypes.SELECT })
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}
module.exports.info_achat = async(req,res) => {
    try {
        let query = `select * from historique_achats where id_achat = ${req.params.id_achat}`
        const data = await sequelize.query(query, { type: QueryTypes.SELECT })
        return res.json(data[0])
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}
module.exports.historique_achat = async(req,res) => {
    try {
        const {userId, dateMin, dateMax, status} = req.body
        let query = `select * from historique_achats where id_utilisateur = ${userId}`
        if(dateMin !== '' && dateMax === ''){
            query += ` and date >= '${dateMin}' `
        }
        else if(dateMax !== '' && dateMin === ''){
            query += ` and date <= '${dateMax}' `
        }
        else if(dateMax !== '' && dateMin !== ''){
            query += ` and date between '${dateMin}' and '${dateMax}'`
        }
        //status
        if(status !== 'tous'){
            query += ` and status = '${status}'`
        }
        const data = await sequelize.query(query, { type: QueryTypes.SELECT })
        return res.json(data)
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}

module.exports.validation_codebit = async(req,res) => {
    try {
        const {id_achat, id_utilisateur, decision, amount} = req.body
        const utilisateur = await Utilisateur.findOne({ where: {id: id_utilisateur}})
        const wallet = await Portefeuille.findOne({where: {id: utilisateur.id_portefeuille}})
        const achatToValidate = await Achat.findOne({where:{id: id_achat}})
        const codebitToValidate = await Codebit.findOne({where:{id_achat}})

        if(decision){
            if(wallet.solde >= amount){
                wallet.solde = wallet.solde-amount
                wallet.save()
                achatToValidate.status = "payé"
                codebitToValidate.status = "payé"
                achatToValidate.save()
                codebitToValidate.save()
                return res.json("payé")
            }else{
                return res.json("solde insuffisant")
            }
        }else{
            achatToValidate.status = 'annulé'
            codebitToValidate.status = 'annulé'
            achatToValidate.save()
            codebitToValidate.save()
            return res.json("suspendu")
        }
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}
module.exports.demande_codebit = async(req,res) => {
    try {
        const {id_demandeur, telephone_validateur, panier , montant,echeance} = req.body
        const demandeur = await Utilisateur.findOne({where: {id: id_demandeur}})
        const validateur= await sequelize.query(`
            select * 
                from utilisateurs 
                where 
                    id_portefeuille!=${demandeur.id_portefeuille} 
                    and 
                    telephone='${telephone_validateur}'`
            , { type: QueryTypes.SELECT })
        if(validateur.length > 0){
            const achat = await Achat.create({
                id_utilisateur: id_demandeur,
                status: "en attente de validation",
                date,
                echeance
            })
            panier.forEach( async(element) => {
                await Detail_achat.create({
                    id_achat: achat.id,
                    id_medicament: element.id_medicament,
                    prix: element.prix,
                    quantite: element.quantite
                })
            });
            const new_codebit = await Codebit.create({
                demandeur: id_demandeur,
                validateur: validateur[0].id,
                id_achat: achat.id,
                montant: montant,
                status: 'en attente de validation',
                date
            })
            return res.json(true)    
        }else{
            return res.json(null)    
        }
        // }  
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}
module.exports.findAndCountAll = async(req,res) => {
    try {
        var page = req.params.page
        if(page<=0) page = 0
        const achats = await Achat.findAndCountAll({
            limit:2,
            offset: page * 2
        })
        return res.json({achats, total: Math.ceil(achats.count / 2)})
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}
module.exports.debit = async(req,res) => {
    try {
        const {panier, id_utilisateur,amount,echeance} = req.body
        const utilisateur = await Utilisateur.findOne({where: {id: id_utilisateur}})
        const wallet = await Portefeuille.findOne({ where: {id: utilisateur.id_portefeuille} })
        if(wallet.solde >= amount){
            wallet.solde = wallet.solde-amount
            wallet.save()
            const achat = await Achat.create({
                id_utilisateur,
                date: date,
                status: "payé",
                echeance
            })
            panier.forEach( async(element) => {
                await Detail_achat.create({
                    id_achat: achat.id,
                    id_medicament: element.id_medicament,
                    prix: element.prix,
                    quantite: element.quantite
                })
            });
            return res.json(true)
        }else{
            return res.json(false)
        }
    } catch (error) {
        return res.json(error.message)
    }
}
module.exports.findOne = async(req,res) => {
    try {
        const achat = await Achat.findOne({
            where: { id: req.params.id}
        })
        return res.json(achat)
    } catch (error) {
        return res.json(error.message)
    }
}
module.exports.findAll = async(req,res) => {
    try {
        return res.json(await Achat.findAll())
    } catch (error) {
        return res.json(error.message)
    }
}