const authController = require('../controllers/authController')
const abonnementController = require('../controllers/abonnementController')
const backofficeController = require('../controllers/backofficeController')
const prestataireController = require('../controllers/prestataireController')
const utilisateurController = require('../controllers/utilisateurController')
const medicamentController = require('../controllers/medicamentController')
const achatController = require('../controllers/achatController')
const codebitController = require('../controllers/codebitController')


const {Router} = require('express')
const router = Router()

router.get('/logout', authController.logout)
router.post('/subscribe', utilisateurController.subscribe)
router.post('/signin', authController.signin)
router.get('/abonnement/findAll', abonnementController.findAll)
router.post('/backoffice/create', backofficeController.create)


/*********CODEBIT**********/
router.get('/codebit/getAllWithDetails/:id_utilisateur', codebitController.getAllWithDetails)
/*********ACHAT**********/
router.post('/achat/debit', achatController.debit)
router.post('/achat/demande_codebit', achatController.demande_codebit)
router.post('/achat/validation_codebit', achatController.validation_codebit)
router.post('/achat/export_pdf', achatController.export_pdf)
router.post('/achat/historique_achat', achatController.historique_achat)
router.get('/achat/getDetail_achat/:id_achat', achatController.getDetail_achat)
router.get('/achat/info_achat/:id_achat', achatController.info_achat)

/*****PRESTATAIRE ROUTES*****/
router.get('/prestataire/findOne/:id', prestataireController.findOne)
router.get('/prestataire/findAll', prestataireController.findAll)
router.get('/prestataire/findAndCountAll/:page', prestataireController.findAndCountAll)
router.post('/prestataire/create', prestataireController.create)
router.post('/prestataire/update/:id', prestataireController.update)
router.delete('/prestataire/delete/:id', prestataireController.delete)

router.post('/prestataire/addOrChangePriceMedicament', prestataireController.addOrChangePriceMedicament) //AJOUTER OU MODIFIER PRIX MEDOC
router.post('/prestataire/getAllAvailable', prestataireController.getAllAvailable) //PRESTATAIRE DISPONIBLE

router.get('/prestataire/getAddedMedicaments/:id_prestataire', prestataireController.getAddedMedicaments)
router.get('/prestataire/getNonAddedMedicaments/:id_prestataire', prestataireController.getNonAddedMedicaments)

router.post('/prestataire/deleteMedicament', prestataireController.deleteMedicament)
router.post('/prestataire/uploader', prestataireController.uploader) //UPLOAD

/*****MEDICAMENT ROUTES*****/
router.post('/medicament/stat', medicamentController.stat)
router.get('/medicament/findOne/:id', medicamentController.findOne)
router.get('/medicament/findAll', medicamentController.findAll)
router.get('/medicament/findAndCountAll/:page', medicamentController.findAndCountAll)
router.post('/medicament/create', medicamentController.create)
router.post('/medicament/update/:id', medicamentController.update)
router.delete('/medicament/delete/:id', medicamentController.delete)
router.post('/medicament/getPrice', medicamentController.getPrice)
// router.post('/medicament/getMontantPanier', medicamentController.getMontantPanier)


/*****UTILISATEUR ROUTES*****/
router.get('/utilisateur/findOne/:id', utilisateurController.findOne)
router.get('/utilisateur/findAll', utilisateurController.findAll)
router.get('/utilisateur/findAndCountAll/:page', utilisateurController.findAndCountAll)
router.post('/utilisateur/update/:id', utilisateurController.update)
router.get('/utilisateur/delete/:id', utilisateurController.delete)
router.post('/utilisateur/signup', utilisateurController.signup)
router.post('/utilisateur/getCurrentUserInfo', utilisateurController.getCurrentUserInfo)
router.post('/utilisateur/cashout/:id', utilisateurController.cashout)
router.get('/utilisateur/getUserProfile/:id', utilisateurController.getUserProfile)
router.get('/utilisateur/isSubscribed/:id', utilisateurController.isSubscribed)
router.get('/utilisateur/getLinkedUsers/:id', utilisateurController.getLinkedUsers)


module.exports = router
