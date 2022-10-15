import HeaderBackoffice from '../../components/HeaderBackoffice'
import AlertError from '../../components/AlertError'
import AlertSuccess from '../../components/AlertSuccess'
import React, { useState, useEffect} from 'react'
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import '../../assets/css/InsertionUtilisateur.css'
import axios from 'axios'
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function InsertionPrestataire()  {
    const [alert, setAlert] = useState('')
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [ouverture, setOuverture] = useState('')
    const [fermeture, setFermeture] = useState('')
    const [adresse, setAdresse] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [photo, setPhoto] = useState('')




    useEffect(() => {
        setAlert('')
    }, [])
    const newPrestataire = async() =>{
       console.log("go")
        const {data} = await axios.post('http://localhost:5000/prestataire/create',
        {
            nom,
            description,
            ouverture,
            fermeture,
            adresse,
            longitude,
            latitude,
            photo,
        })
        console.log("newPrestataire:"+data)
        setAlert(data)
        console.log(alert)
    }
    return (
      <div>
        <Grid container id="cont" spacing={10}>
            <Grid item sx={12} md={3}>
           <div className="navLeft">
                    <HeaderBackoffice/>
                </div>
            </Grid>
            <Grid item sx={12} md={9} className="contentRight" style={{marginTop: '50px'}} >
                <div >
                    <h2 className='headTitle'>Insertion prestataire</h2>  <br /><a href="/listePrestataire">Voir la liste</a>
                    <div className='form'> <TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic" label="Nom" variant="outlined"  /> </div>
                    <div className='form'> 
                        <InputLabel>Desciption</InputLabel>
                        <TextareaAutosize
                            onChange={e => {setDescription(e.target.value)}}
                            minRows={4}
                            defaultValue=""
                            style={{ width: 500, opacity: '.8', fontFamily: 'Montserrat', padding: '5px' }}
                        />
                    </div>
                   
                   <div className='form'> <InputLabel>Heure d'ouverture</InputLabel> <TextField onChange={e => {setOuverture(e.target.value)}}  type="time" id="standard-basic"  variant="outlined"  /> </div>
                   <div className='form'> <InputLabel>Heure de fermeture</InputLabel> <TextField onChange={e => {setFermeture(e.target.value)}}  type="time" id="standard-basic"  variant="outlined"  /> </div> 
                   <div className='form'> <TextField onChange={e => {setAdresse(e.target.value)}}  id="standard-basic" label="Adresse" variant="outlined"  /> </div> <br /> <br />

                   <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Coordonnées</h4> 
                   <div className='form'> <TextField onChange={e => {setLongitude(e.target.value)}}  id="standard-basic" label="Longitude" variant="outlined"  /> </div>
                   <div className='form'> <TextField onChange={e => {setLatitude(e.target.value)}} id="standard-basic" label="Latitude" variant="outlined"  /> </div> <br />


                  
                    <Button variant="contained" style={{background: '#00988B'}} onClick={newPrestataire}> Ajouter </Button> <br />
                    { alert===false && <AlertError message="Erreur - Ce prestataire est déjà enregistré!"/>}
                    { alert===true && <AlertSuccess message="Succès - Prestataire ajouté."/>}
                </div>
                   
            </Grid>
        </Grid>
     </div>
    )
}
