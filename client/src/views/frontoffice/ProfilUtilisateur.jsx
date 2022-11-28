import React from 'react'
import '../../assets/css/ProfilUtilisateur.css'

import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';

import Typography from '@mui/material/Typography';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';
import {useSelector} from 'react-redux'
import {showUserId,showSession} from '../../features/utilisateurSlice'
import { useNavigate } from 'react-router-dom';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';

export default function ProfilUtilisateur() {
  const cookies = new Cookies(); 
  const userId = useSelector(showUserId) 
  const session = useSelector(showSession) 

  const [user, setUser] = useState([])
  const [achats, setAchats] = useState([])
  const [dateMin, setDateMin] = useState('')
  const [dateMax, setDateMax] = useState('')
  const [status, setStatus] = useState('tous')


  // const [token, setToken] = useState(cookies.get('jwt'))

  const navigate = useNavigate();
  
  const getHistoriqueAchat = async () => {
    const {data} = await axios.post(`http://localhost:5000/achat/historique_achat`,
    {
      userId,
      dateMin,  
      dateMax,
      status
    })
    setAchats(data)

  }

  useEffect( () => {
    if(session === null) navigate('/')
    const fetchData = async () => {
      const {data} = await axios.get(`http://localhost:5000/utilisateur/getUserProfile/${userId}`)
      console.log(data)
      setUser(data[0])
    }
  
    fetchData()
    getHistoriqueAchat()
  }, [])
  
  
    return (
      <div>
       <Grid container spacing={0} className='container'>
        <Grid item md={12}>
          <Grid item md={8} xs={12} id="left">
            <h4 style={{fontWeight: 800,borderLeft: '3px solid #0399BC', padding: '2%',color: '#0399BC'}}>Mon profil</h4><br />
            <Typography style={{fontFamily: 'Poppins',fontWeight: 600}} variant="h6" color="initial">{user.nom} {user.prenom}</Typography><br /><br />
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
        
        <Grid item md={12}>
          <div className='search-form'>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <InputLabel> Date min</InputLabel>
                <TextField
                  value={dateMin}
                  onChange={ e => setDateMin(e.target.value) }
                  type="date"
                />
              </Grid>
              <Grid item md={3}>
                <InputLabel> Date max</InputLabel>
                <TextField
                  value={dateMax}
                  onChange={ e => setDateMax(e.target.value) }
                  type="date"
                />
              </Grid>
              <Grid item md={3}>
                  <InputLabel >Status</InputLabel>
                <FormControl style={{marginTop: '2%', width:'230px'}}>
                  <Select
                  id="standard-select"
                  value={status}
               
                  onChange={e => {setStatus(e.target.value)}}
                  style={{height: '50px'}}
                  >
                    <MenuItem value='tous'>Tous</MenuItem>
                    <MenuItem value='payé'>Payé</MenuItem>
                    <MenuItem value='suspendu'>Suspendu</MenuItem>
                    <MenuItem value='en attente de validation'>en attente de validation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={3} style={{marginTop: '30px'}}>
                <Button variant="contained" onClick={getHistoriqueAchat}>
                  Rechercher
                </Button>
              </Grid>
          </Grid>
          </div>
          <div>
            <TableContainer component={Paper} sx={{margin:'2%'}}>
              <Table sx={{ minWidth: 100 }} >
                <TableHead>
                  <TableRow >
                    <TableCell style={{fontWeight: 'bold'}}>Ref</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Total</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Echeance</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {achats && achats.map((row) => (
                  <TableRow
                    key={row.id_achat}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">REF-{row.id_achat}</TableCell>
                    <TableCell  component="th" scope="row">{row.total}</TableCell>
                    <TableCell  component="th" scope="row">{row.status}</TableCell>
                    <TableCell  component="th" scope="row">{row.echeance} mois</TableCell>
                    <TableCell  component="th" scope="row">{row.date}</TableCell>
                    <TableCell  component="th" scope="row"> <a href="#" onClick={ () => {localStorage.setItem('id_achat_detail', row.id_achat); navigate('/ficheAchat') }}>Voir plus</a> </TableCell>

                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>

       </Grid>
      </div>
    )
}
