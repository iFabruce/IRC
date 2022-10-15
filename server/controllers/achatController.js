const {sequelize, Achat, Detail_achat, Portefeuille, Utilisateur} = require('../models')
var today = new Date();
var date = today.getFullYear()+'-'+today.getMonth()+1+'-'+today.getDate();


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

