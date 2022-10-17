import React from 'react'
import '../../assets/css/ProfilUtilisateur.css'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

export default function ProfilUtilisateur() {
  const cookies = new Cookies();  
  const [user, setUser] = useState([])
  const [token, setToken] = useState(cookies.get('jwt'))

  

  useEffect( () => {
    const fetchData = async () => {
      const {data} = await axios.get(`http://localhost:5000/utilisateur/getUserProfile/${localStorage.getItem('id_utilisateur')}`)
      console.log(data)
      setUser(data[0])
    }
  
    fetchData()
  }, [])
  
  
    return (
      <div>
       <Grid container spacing={0} className='container'>
         <Grid item md={8} xs={12} id="left">
          <h4 style={{fontWeight: 800,borderLeft: '3px solid #0399BC', padding: '2%',color: '#0399BC'}}>Mon profil</h4><br />
          <Typography style={{fontFamily: 'Montserrat',fontWeight: 600}} variant="h6" color="initial">{user.nom} {user.prenom}</Typography><br /><br />
          <h6 style={{fontWeight: 600}}>Adresse</h6>
          <p>{user.adresse}</p><br />
          <h6 style={{fontWeight: 600}}>Date de naissance</h6>
          <p>{user.date_naissance}</p><br />
          <h6 style={{fontWeight: 600}}>Situation matrionial</h6>
          <p>{user.situation_matrimonial} </p><br />

         </Grid>
         <Grid item md={4} xs={12} id="right">
             <Grid item md={12} xs={12} className="box"> <p style={{fontWeight: 800,color: '#0399BC'}}> <AccountBalanceWalletOutlinedIcon />  {user.solde} AR </p><p style={{fontWeight: 400}}>Portefeuille</p> </Grid>
             <Grid item md={12} xs={12} className="box">  <p  style={{fontWeight: 800,color: '#5A55AA'}}><AddShoppingCartOutlinedIcon />  {user.abonnement} </p> <p style={{fontWeight: 400}}>Abonnement (Expire le {user.date_expiration})</p> </Grid>
         </Grid>

       </Grid>
      </div>
    )
}
