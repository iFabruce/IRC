import React from 'react'
import '../../assets/css/Accueil.css'
import { Grid, Card, TextareaAutosize, TextField, CardContent, Button } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Cookies from 'universal-cookie';
import {showUserId, showSession} from '../../features/utilisateurSlice'
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';


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
          style={{backgroundImage: `url(${require('../../assets/images/img1.png')})`, backgroundSize: 'cover', height: '90vh'}}
        >
            <Grid item xs={12} sm={12} md={12}>
              <div className="item-left" >
                <h1>Un accès simplifié à vos soins médicaux</h1> <br /><p>Effectuer l'achat de vos médicaments en seulement 3 étapes</p> <br />
                <Button disableElevation={true} variant="contained" className="button" onClick={ () => navigate('/choixMedicament')}  > Commencez maintenant</Button>
              </div>
            </Grid> 
        </Grid>

        <Grid container spacing={0} className="section-how">
        <Grid item xs={12}  md={12}> 
            <h2 className="section-header">Comment fonctionne IRC?</h2>
        </Grid>
            <Grid item xs={12}  md={4}>
               <Card className="card-process">
                  <CardContent>
                    <img src={require('../../assets/icons/cart.png')} className="img-process" />
                    <h3 className="section-h3">Achat</h3> 
                    <p className="section-p">Ajoutez les médicaments dans votre panier.</p>
                  </CardContent>
                </Card>
          
            </Grid>

            <Grid item xs={12}  md={4}>
               <Card className="card-process">
                  <CardContent>
                    <img src={require('../../assets/icons/location.png')} className="img-process" />
                    <h3 className="section-h3">Localisation</h3> 
                    <p className="section-p">Trouvez les prestataires de soins à proximité de vous.</p>
                  </CardContent>
                </Card>
           
            </Grid>

            <Grid item xs={12}  md={4}>
               <Card className="card-process">
                  <CardContent>
                    <img src={require('../../assets/icons/credit-card.png')} className="img-process" />
                    <h3 className="section-h3">Paiement</h3> 
                    <p className="section-p">Accedez à un paiement sécurisé et à crédit.</p>
                  </CardContent>
                </Card>
           
            </Grid>
                 
      
        </Grid>

        <Grid container spacing={0} className='section-why'>


          <Grid item xs={12} md={12}>
            <h2 className="section-header">Pourquoi choisir IRC?</h2>
         </Grid>
         <Grid item xs={12} md={6}>
          <p className='p-why'>Parmi les recherches portant sur  le cas de Madagascar, 
plus de 80% de la population malgache ne dispose que 1,90 dollars par jour pour survivre. En effet le niveau de la disponibilité des ménages à payer pour la santé constitue ainsi une des causes du faible recours aux soins.</p> 
        <p className='p-why'>
        Avec <strong style={{fontWeight: '600', color: '#0399BC'}}>IRC</strong> , vous pouvez accéder à des soins médicaux grâce à des <strong style={{fontWeight:'600'}}>facilités de paiement.</strong> Vous pouvez effectuer vos <strong style={{fontWeight:'600'}}> achats de médicaments en ligne</strong> en vous aidant à trouver les prestataires de soins disponible selon vos choix et récupérer physiquement les médicaments dans les prestataires choisis.
        </p>
         </Grid>
         <Grid item xs={12} md={6}>
          <img src={require('../../assets/images/undraw_online_ad_re_ol62.png')}  className='img-why'/>
         </Grid>
       
        </Grid>
        <Grid container spacing={0} className="section-contact">
          <Grid item xs={12} md={12}>
            <h2 className="section-header" style={{marginTop: '2%'}}>Contact</h2>
            <TextField className="contact-fieldlong" label="Nom et prénom" variant="outlined"  /> <br />
            <TextField className="contact-fieldlong" label="Email" variant="outlined" type="email" /> <br />
            <TextField className="contact-field" label="Téléphone" variant="outlined" /> <br /> 
            <TextareaAutosize  className="contact-field" 
                            minRows={5}
                            defaultValue=""
                            placeholder='Message'
                            style={{ width: 500, opacity: '.8', fontFamily: 'Poppins', padding: '5px' }}
                        /> <br />
                <Button disableElevation={true} variant="contained" className="btn-section-contact"  >Envoyer</Button>

          </Grid> 
        
       
        </Grid>
        <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12}>
              <Footer/>
            </Grid>
        </Grid>


    </div>
  )
}
