import '../../assets/css/Login.css';
import {useState, useEffect} from 'react'
import app from '../../app'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


import { Grid, Paper, TextField, FormControl,MenuItem, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('')
  const [mot_de_passe, setMot_de_passe] = useState('')
  const [message, setMessage] = useState('')
  const [profil, setProfil] = useState('')

  const signin = async () => {
    try {
      const params = {login: login, mot_de_passe, profil}
      let {data} = await app.post(`signin`, params);
      console.log("token:"+data.token);
      localStorage.setItem('session',data.token) //Création session
      console.log("SESSION:"+localStorage.getItem('session'))
      localStorage.setItem('id_panier',0)
      //Redirection
      if(data.profil === 'utilisateurs'){
        const {data} = await app.post(`utilisateur/getCurrentUserInfo`, { token: localStorage.getItem('session')});
        console.log("id:"+data)
        localStorage.setItem('id_utilisateur', data) 
        navigate('/accueil')
      }
      else if(data.profil === 'backoffices'){
        // console.log("SESSION:"+localStorage.getItem('session'))

        navigate('/insertionUtilisateur')
      }
      else{//Affichage message
        setMessage(data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Grid container >
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
              <FormControl style={{marginTop: '2%', width:'230px'}}>
                        <InputLabel >Profil</InputLabel>
                            <Select
                            id="standard-select"
                            value={profil}
                            label="Profil"
                            onChange={e => {setProfil(e.target.value)}}
                            style={{height: '50px'}}
                            >
                            <MenuItem value='utilisateurs'>Utilisateur</MenuItem>
                            <MenuItem value='backoffices'>Administrateur</MenuItem>

                            </Select>
                    </FormControl>
              </div>
              <div id="input">   <TextField  className="text-field"  id="standard-basic" label="Identifiant" variant="standard" onChange={(e => (setLogin(e.target.value)))} /></div> 
              <div id="input">   <TextField  className="text-field"  id="standard-basic" type="password" label="Mot de passe" variant="standard"  onChange={(e => (setMot_de_passe(e.target.value)))}/>   </div>
              <div id="input"> <Button  variant="contained" className="button" onClick={signin} > Se connecter </Button></div>
              <div id="input">  <p style={{color: 'red'}}>{message}</p> </div>

         
        </Grid>
      
    </Grid>
    </div>
  );
}

export default App;
