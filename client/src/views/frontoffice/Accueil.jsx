import React from 'react'
import '../../assets/css/Accueil.css'
import { Grid, Card, Button } from '@mui/material';
import Header from '../../components/Header';

import Cookies from 'universal-cookie';
import { useEffect } from 'react';
const cookies = new Cookies();
export default function Accueil() {
  useEffect(() => {
    console.log("COOKIES:"+cookies.get('jwt')) 
   
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
            
            <Grid item sx={12} md={7} className="item-left">
                <h1>Un accès simplifié à vos soins médicaux: {cookies.get('jwt')}</h1> <br />
                <Button disableElevation={true} variant="contained" className="button"  > Commencez maintenant </Button>
            </Grid> 
            <Grid item sx={12} md ={5}>
                <div  className="item-right">

                </div>
            </Grid>  
        </Grid>
    </div>
  )
}
