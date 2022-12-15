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
    const [telephone, setTelephone] = useState('')
    const [reference, setReference] = useState('')
    const [date_naissance, setDate_naissance] = useState('')
    const [sexe, setSexe] = useState('')
    const [adresse, setAdresse] = useState('')
    const [situation_matrimonial, setSituation_matrimonial] = useState('')
    const [login, setLogin] = useState('')
    const [mot_de_passe, setMot_de_passe] = useState('')
    const [password_match, setPassword_match] = useState('')


    const [isLinked, setIsLinked] = useState('')

    useEffect(() => {
        setAlert('')
    }, [])
    const checkPassword = (password) =>{
        if(password === mot_de_passe){
            setPassword_match(true)
        }else{
            setPassword_match(false)
        }

    }
    const signup = async() =>{
       console.log("go-signup")
       console.log("login:"+login)
       console.log("mot_de_passe:"+mot_de_passe)
       console.log("nom:"+nom)
       console.log("prenom:"+prenom)
       console.log("telephone:"+telephone)
       console.log("reference:"+reference)
       console.log("sexe:"+sexe)
       console.log("date_naissance:"+date_naissance)
       console.log("situation_matrimonial:"+situation_matrimonial)
       console.log("adresse:"+adresse)




        const {data} = await axios.post('http://localhost:5000/utilisateur/signup',
        {
            login,
            mot_de_passe,
            nom,
            prenom,
            telephone,
            reference,
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
        <Grid container spacing={10}>
            <Grid item sx={12} md={3}>
           <div className="navLeft">
                    <HeaderBackoffice/>
                </div>
            </Grid>
            <Grid item sx={12} md={9} className="contentRight" style={{marginTop: '20px'}}>
                <div>
                    <h2 className='headTitle'>Insertion utilisateur</h2><br /><a href="/listeUtilisateur">Voir la liste</a> <br /><br />
                    <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Informations personnelles</h4> 

                   <div className='form'> <TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic" label="Nom" variant="outlined"  /> </div>
                   <div className='form'> <TextField onChange={e => {setPrenom(e.target.value)}} className="text-field"  id="standard-basic" label="Prénom" variant="outlined"  /></div>
                   <div className='form'> <TextField onChange={e => {setTelephone(e.target.value)}} className="text-field"  id="standard-basic" label="Telephone" variant="outlined"  /></div><br />

                  
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
                            <MenuItem value={'homme'}>homme</MenuItem>
                            <MenuItem value={'femme'}>femme</MenuItem>

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
                            <MenuItem value={'Célibataire'}>Célibataire</MenuItem>
                            <MenuItem value={'Marié(e)'}>Marié(e)</MenuItem>
                            <MenuItem value={'Divorcé(e)'}>Divorcé(e)</MenuItem>
                            <MenuItem value={'Veuf(ve)'}>Veuf(ve)</MenuItem>
                            </Select>
                        </FormControl>
                        <div className='form'>  <br /> <br />
                        <h4 style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Informations du compte</h4> 
                        <div className='form'> <TextField onChange={e => {setLogin(e.target.value)}}  id="standard-basic" label="Identifiant (numéro CIN)" variant="outlined"  /> </div>
                        <div className='form'> <TextField onChange={e => {setMot_de_passe(e.target.value)}} type="password" id="standard-basic" label="Mot de passe" variant="outlined"  /></div> <br />
                        <div className='form'> <TextField onChange={e => {checkPassword(e.target.value)}} type="password" id="standard-basic" label="Répétez le mot de passe" variant="outlined"  /> <br />   { password_match === false && <AlertError message="Le mot de passe ne corréspond pas..."/>}{ password_match === true && <AlertSuccess message="Le mot de passe coresspond."/>}</div> <br />
                       
                        <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Portefeuille</h4> <br />
                        <p>Créer votre propre portefeuille ou se lier avec un autre utilisateur</p> 
                        <div className='form'> <TextField onChange={e => {setReference(e.target.value)}} value={reference} className="text-field"  id="standard-basic" label="Reference" variant="outlined"  /></div> <Button style={{textTransform: 'unset'}} onClick={ () => { console.log(telephone); setReference(telephone)}}>Créer mon propre portefeuille</Button> <br />
                   <br />
                        <Button variant="contained" style={{background: '#00988B'}} onClick={signup}> Ajouter </Button>
                        { alert=== 'userExist' && <AlertError message="Ce numéro CIN est déjà inscrit..."/>}
                        { alert=== 'success' && <AlertSuccess message="Votre compté a été crée avec succès."/>}
                        </div> <br />
                        { alert==='notExist' && <AlertError message=" Ce numero n'est lié à aucun utilisateur..Veuillez verifier le numero!"/>}


            </Grid>
        </Grid>
     </div>
    )
}
