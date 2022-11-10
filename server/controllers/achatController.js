const {sequelize, Achat, Detail_achat, Portefeuille, Utilisateur, Codebit} = require('../models')
const { QueryTypes } = require('sequelize');
var pdf = require('html-pdf');

var date = new Date();
date = date.getFullYear() + '/' + String(date.getMonth() + 2).padStart(2, '0') + '/' + String(date.getDate()).padStart(2, '0')


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
      
        console.log("query:"+query)
        const data = await sequelize.query(query, { type: QueryTypes.SELECT })
        return res.json(data)

    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports.export_pdf = async(req,res) => {
  
        const {panier, id} = req.body
        let table=""
        table += "<table border='1' style='width:100%;word-break:break-word;border-collapse: collapse;padding:5px;border-spacing:30px'>";
        table += "<tr style='background: #FF4E50'>";
        table += "<th >Medicament</th>";
        table += "<th >Quantité</th>";
        table += "</tr>";
      
        
        panier.map(row =>{
            table+='<tr>'
            table += `<td>${row.nom}</td>`
            table += `<td>${row.quantite}</td>`
            table+='<td>'
        })
    
        
        var options = {
          "format": "A4",
          "orientation": "landscape",
          "border": {
            "top": "0.1in",
        },
        "timeout": "120000"
        };
        pdf.create(table, options).toFile(`./downloads/facture-${id}.pdf`, async function(err, result) {
            if (err) {
                 console.log(err);
                 return false
            }else{
                console.log("pdf create");
                return true
            }
        });
    
}
module.exports.validation_codebit = async(req,res) => {
    try {
        const {id_achat, id_utilisateur, decision, amount} = req.body
        console.log("id_achat:"+id_achat)
        console.log("id_utilisateur:"+id_utilisateur)
        console.log("decision:"+decision)
        console.log("amount:"+amount)


        const utilisateur = await Utilisateur.findOne({ where: {id: id_utilisateur}})
        const wallet = await Portefeuille.findOne({where: {id: utilisateur.id_portefeuille}})
        const achatToValidate = await Achat.findOne({where:{id: id_achat}})
        if(decision){
            if(wallet.solde >= amount){
                wallet.solde = wallet.solde-amount
                wallet.save()
                achatToValidate.status = "payé"
                achatToValidate.save()
                console.log("payé")
                return res.json("payé")
            }else{
                console.log("solde insuffisant")
                return res.json("solde insuffisant")
            }
        }else{
            achatToValidate.status = "suspendu"
            achatToValidate.save()
            console.log("suspendu")
            return res.json("suspendu")
        }
    } catch (error) {
        console.log(error)
        return res.json("error")
    }
}
module.exports.demande_codebit = async(req,res) => {
    try {
        const {id_demandeur, telephone_validateur, panier , montant} = req.body
        const demandeur = await Utilisateur.findOne({id: id_demandeur})
        const validateur= await sequelize.query(`select * from utilisateurs where id_portefeuille!=${demandeur.id_portefeuille} and telephone='${telephone_validateur}'`, { type: QueryTypes.SELECT })
        // const wallet = await Portefeuille.findOne({id: demandeur.id , id_portefeuille: validateur.id_portefeuille})
        // if(wallet.solde >= amount){
        //     wallet.solde = wallet.solde-amount
        //     wallet.save()
        console.log("VALIDATEUR:"+validateur.length)
        if(validateur.length > 0){
            const achat = await Achat.create({
                id_utilisateur: id_demandeur,
                status: "en attente de validation",
                date
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
        console.log(error)
        return res.json(false)
    }
}
module.exports.findAndCountAll = async(req,res) => {
    var page = req.params.page
    if(page<=0) page = 0
    const achats = await Achat.findAndCountAll({
        limit:2,
        offset: page * 2
    })
    return res.json({achats, total: Math.ceil(achats.count / 2)})
}
module.exports.debit = async(req,res) => {
    try {
        console.log("DATE:"+date)
        const {panier, id_utilisateur, amount} = req.body
        const utilisateur = await Utilisateur.findOne({where: {id: id_utilisateur}})
        const wallet = await Portefeuille.findOne({ where: {id: utilisateur.id_portefeuille} })
        if(wallet.solde >= amount){
            wallet.solde = wallet.solde-amount
            wallet.save()
            const achat = await Achat.create({
                id_utilisateur,
                date: "2022-10-12",
                status: "payé",
            })
            console.log("panierLENGTH:"+panier.length)
        
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
        console.log(error)
        return res.json("error")
    }
}
module.exports.findOne = async(req,res) => {
    const achat = await Achat.findOne({
        where: { id: req.params.id}
    })
    return res.json(achat)
}
module.exports.findAll = async(req,res) => {
    const achats = await Achat.findAll()
    return res.json(achats)
}

