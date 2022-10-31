import React from 'react'
import '../../assets/css/Accueil.css'
import { Grid, Card, Button } from '@mui/material';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import {showUserId, showSession} from '../../features/utilisateurSlice'

export default function Accueil() {
  const session = useSelector(showSession)
  const userId = useSelector(showUserId)

  const dispatch = useDispatch()
  const cookies = new Cookies()
  useEffect(() => {
    console.log("USER ID:"+userId)
    // dispatch(setSession(cookies.get('jwt')))
  }, [])
  

  return (
    <div>
        <Header/>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          alignContent="stretch"
          wrap="nowrap"
          style={{backgroundImage: `url(${require('../../assets/images/img1.png')})`, backgroundSize: 'cover', height: '100vh'}}
        >
            
            <Grid item sx={12} md={12} className="item-left">
                <h1>Un accès simplifié à vos soins médicaux</h1> <br /><p id="txt">Effectuer l'achat de vos médicaments en seulement 3 étapes</p> <br />
                <Button disableElevation={true} variant="contained" className="button"  > Commencez maintenant</Button>
            </Grid> 
           
        </Grid>
    </div>
  )
}
