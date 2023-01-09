const express = require('express')
const app = express()
const route = require('./routes/routes')
app.use(route) 
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
const cors = require('cors');
const origin = process.env.NODE_ENV === "development" 
  ? "https://irc-smoky.vercel.app" 
  : "https://irc-smoky.vercel.app"
app.use(
  cors({
    credentials: true,
    origin
  }),
);
const PORT = process.env.PORT || 5000
app.listen(PORT,async () =>{
    console.log("loading...")
    await sequelize.authenticate()
    console.log("sequelize!")
})