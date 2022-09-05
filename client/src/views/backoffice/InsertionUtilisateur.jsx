import HeaderBackoffice from '../../components/HeaderBackoffice'
import AlertError from '../../components/AlertError'
import AlertSuccess from '../../components/AlertSuccess'
import React, { useState, useEffect} from 'react'
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import '../../assets/css/InsertionUtilisateur.css'
import axios from 'axios'


export default function InsertionUtilisateur()  {
    const [alert, setAlert] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [date_naissance, setDate_naissance] = useState('')
    const [sexe, setSexe] = useState('')
    const [adresse, setAdresse] = useState('')
    const [situation_matrimonial, setSituation_matrimonial] = useState('')
    const [login, setLogin] = useState('')
    const [mot_de_passe, setMot_de_passe] = useState('')


    useEffect(() => {
        setAlert('')
    }, [])
    const signup = async() =>{
       console.log("go")
        const {data} = await axios.post('http://localhost:5000/signup',
        {
            login,
            mot_de_passe,
            nom,
            prenom,
            sexe,
            date_naissance,
            situation_matrimonial,
            adresse
        })
        console.log("signup:"+data)
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
            <Grid item sx={12} md={9} className="contentRight" style={{marginTop: '20px'}}>
                <div>
                    <h2 className='headTitle'>Insertion utilisateur</h2><br /><br />
                    <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Informations personnelles</h4> 

                   <div className='form'> <TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic" label="Nom" variant="outlined"  /> </div>
                   <div className='form'> <TextField onChange={e => {setPrenom(e.target.value)}} className="text-field"  id="standard-basic" label="Prénom" variant="outlined"  /></div>
                   <div className='form-date'>  <InputLabel >Date de naissance</InputLabel> <TextField    onChange={e => {setDate_naissance(e.target.value)}} id="standard-basic"  variant="outlined" type="date" /></div>
                   <div style={{marginTop: '2%'}}>  
                    <FormControl style={{marginTop: '2%', width:'230px'}}>
                        <InputLabel >Sexe</InputLabel>
                            <Select
                            id="standard-select"
                            value={sexe}
                            label="Sexe"
                            onChange={e => {setSexe(e.target.value)}}
                            >
                            <MenuItem value={'H'}>Homme</MenuItem>
                            <MenuItem value={'F'}>Femme</MenuItem>

                            </Select>
                    </FormControl>
                </div>
                   <div className='form'> <TextField  onChange={e => {setAdresse(e.target.value)}} id="standard-basic" label="Adresse" variant="outlined"  /></div>
                   </div>
                <FormControl style={{marginTop: '3%', width:'230px'}}>
                        <InputLabel >Situation matrimonial</InputLabel>
                            <Select
                            id="standard-select"
                            // value={age}
                            label="Situation matrimonial"
                            onChange={e => {setSituation_matrimonial(e.target.value)}}
                            >
                            <MenuItem value={'C'}>Célibataire</MenuItem>
                            <MenuItem value={'M'}>Marié(e)</MenuItem>
                            <MenuItem value={'D'}>Divorcé(e)</MenuItem>
                            <MenuItem value={'V'}>Veuf(ve)</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='form'>  <br /> <br />
                        <h4 style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Informations du compte</h4> 
                        <div className='form'> <TextField onChange={e => {setLogin(e.target.value)}}  id="standard-basic" label="Identifiant (numéro CIN)" variant="outlined"  /> </div>
                        <div className='form'> <TextField onChange={e => {setMot_de_passe(e.target.value)}} type="password" id="standard-basic" label="Mot de passe" variant="outlined"  /></div> <br />
                        <Button variant="contained" style={{background: '#00988B'}} onClick={signup}> Ajouter </Button>
                        { alert===false && <AlertError message="Erreur - Ce numéro CIN est déjà inscrit!"/>}
                        { alert===true && <AlertSuccess message="Succès - Votre compté a été crée."/>}
                        </div>

            </Grid>
        </Grid>
     </div>
    )
}
