import '../../assets/css/Login.css';
import {useState, useEffect} from 'react'
import axios from 'axios'



import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


import { Grid, Paper, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('')
  const [mot_de_passe, setMot_de_passe] = useState('')
  const [message, setMessage] = useState('')


 
  const signin = async () => {
    // e.preventDefault();
    console.log("click")
    const params = {
      login: login,
      mot_de_passe: mot_de_passe
    }
    console.log(params)
    let axiosConfig = {
      withCredentials: true,
    }
    //   const headers = {
    //     'Content-Type': 'text/plain'
    // };
    const  {data}  = await axios.post(`http://localhost:5000/signin`,params, { 'Access-Control-Allow-Credentials': true});
    console.log(data) 
    if(data == 'logged in'){
      console.log("tafiditra e")

      navigate('/abonnement')
      
    }else{
      console.log("misy diso e")
      // setMessage(data)
    }
    setMessage(data)
    console.log(message)
  };
  return (
    
    <div>
      <Grid container id="content" >
        <Grid item xs={12} md={6} >
          <Paper>
            <div id="illustration">
              <Typography variant="h4" color="white" id="typo-header" >Simplifie l'accès à vos soins</Typography> 
              <Typography variant="body1" color="white" id="typo">IRC vous permet de localiser facilement les préstataires de soins à proximité de vous, tout en incluant une facilitation de paiement pour les services.</Typography>
              </div>
          </Paper>
        </Grid>
        <Grid item  xs={12} md={6}>
         
            <div id="logo"><img src={require('../../assets/images/LOGO-IRC-PRIMAIRE.png')} alt="" /></div>
              <div id="select">  
                <TextField  className="text-field" id="standard-select" select    label="Profil" variant="standard">   
                  <option value='Utilisateur' >Utilisateur</option>     
                  <option value='Administrateur' >Administrateur</option>   
                  </TextField> 
              </div>
              <div id="input">   <TextField  className="text-field"  id="standard-basic" label="Identifiant" variant="standard" onChange={(e => (setLogin(e.target.value)))} /></div> 
              <div id="input">   <TextField  className="text-field"  id="standard-basic" type="password" label="Mot de passe" variant="standard"  onChange={(e => (setMot_de_passe(e.target.value)))}/>   </div>
              <div id="connect"> <Button  variant="contained" className="button" onClick={signin} > Se connecter </Button></div>
              <p>{message}</p>

         
        </Grid>
      
    </Grid>
    </div>
  );
}

export default App;
