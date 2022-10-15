//Express
const express = require('express')
const app = express()
//Cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())

var cors = require('cors')
//Cors
const corsConfig = {
    origin: '*',
    credentials: true,
};  
app.use(cors());
app.options('*', cors(corsConfig));

//Routes
const route = require('./routes/routes')
app.use(route) 

const {sequelize, Utilisateur, Compte, Abonnement} = require('./models');    //Models

app.get('/utilisateurs', async (req,res) =>{
    try {
        const users = await Utilisateur.findAll({include: 'comptes'})
        
        return res.json(users)
    } catch (error) {
        return res.json(error)
    }
})

app.get('/comptes', async (req,res) =>{
    try {
        const comptes = await Compte.findAll()
        return res.json(comptes)
    } catch (error) {
        return res.json(error)
    }
})


app.listen(5000,async () =>{
    console.log("loading...")
    await sequelize.authenticate()
    console.log("sequelize!")
})

