const authController = require('../controllers/authController')
const utilisateurController = require('../controllers/utilisateurController')
const abonnementController = require('../controllers/abonnementController')
const backofficeController = require('../controllers/backofficeController')
const prestataireController = require('../controllers/prestataireController')
const medicamentController = require('../controllers/medicamentController')



const {Router} = require('express')
const router = Router()

router.post('/getUserProfile', utilisateurController.getUserProfile)
router.get('/logout', authController.logout)
router.get('/subscribe/:id_user/:id_abonnement', utilisateurController.subscribe)
router.post('/getCurrentUser', utilisateurController.getCurrentUser)
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/abonnement/findAll', abonnementController.findAll)
router.post('/backoffice/create', backofficeController.create)



/*****PRESTATAIRE ROUTES*****/
router.get('/prestataire/findOne/:id', prestataireController.findOne)
router.get('/prestataire/findAll', prestataireController.findAll)
router.post('/prestataire/create', prestataireController.create)
router.post('/prestataire/update/:id', prestataireController.update)
router.delete('/prestataire/delete/:id', prestataireController.delete)
router.get('/prestataire/addMedicament/:id_prestataire/:id_medicament', prestataireController.addMedicament)
router.post('/prestataire/getAllAvailable', prestataireController.getAllAvailable)


/*****MEDICAMENT ROUTES*****/
router.get('/medicament/findOne/:id', medicamentController.findOne)
router.get('/medicament/findAll', medicamentController.findAll)
router.post('/medicament/create', medicamentController.create)
router.post('/medicament/update/:id', medicamentController.update)
router.delete('/medicament/delete/:id', medicamentController.delete)



module.exports = router