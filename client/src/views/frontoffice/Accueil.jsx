import React from 'react'
import '../../assets/css/Accueil.css'
import { Grid, Card, Button } from '@mui/material';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import {showUserId, showSession} from '../../features/utilisateurSlice'
import { useNavigate } from 'react-router-dom';

export default function Accueil() {
  const session = useSelector(showSession)
  const userId = useSelector(showUserId)
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const cookies = new Cookies()
  
  useEffect(() => {if(session === null) navigate('/')},[])
  
  return (
    <div>
        <Header/>
        <Grid
          container
          spacing={0}
          style={{backgroundImage: `url(${require('../../assets/images/img1.png')})`, backgroundSize: 'cover', height: '100vh'}}
        >
          
            <Grid item xs={12} sm={12} md={12}>
              <div className="item-left">
                <h1>Un accès simplifié à vos soins médicaux</h1> <br /><p>Effectuer l'achat de vos médicaments en seulement 3 étapes</p> <br />
                <Button disableElevation={true} variant="contained" className="button"  > Commencez maintenant</Button>
              </div>
            </Grid> 
            
        </Grid>
    </div>
  )
}
