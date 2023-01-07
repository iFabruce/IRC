const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())
const cors = require('cors');
const origin = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000" 
  : "http://localhost:3000"

app.use(
  cors({
    credentials: true,
    origin
  }),
);
const route = require('./routes/routes')
app.use(route) 

app.get('/test', (req, res) => {
  console.log("success")
});


const PORT = process.env.PORT || 5000
app.listen(PORT,async () =>{
    console.log("loading...")
    await sequelize.authenticate()
    console.log("sequelize!")
})

