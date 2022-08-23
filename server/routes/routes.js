const authController = require('../controllers/authController')
const utilisateurController = require('../controllers/utilisateurController')
const abonnementController = require('../controllers/abonnementController')

const {Router} = require('express')
const router = Router()

router.post('/getUserProfile', utilisateurController.getUserProfile)
router.get('/logout', authController.logout)
router.get('/subscribe/:id_user/:id_abonnement', utilisateurController.subscribe)
router.post('/getCurrentUser', utilisateurController.getCurrentUser)
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/abonnement/findAll', abonnementController.findAll)

module.exports = router