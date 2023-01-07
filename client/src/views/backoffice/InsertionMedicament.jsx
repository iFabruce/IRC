import HeaderBackoffice from '../../components/HeaderBackoffice'
import AlertError from '../../components/AlertError'
import AlertSuccess from '../../components/AlertSuccess'
import React, { useState, useEffect} from 'react'
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import '../../assets/css/InsertionUtilisateur.css'
import axios from 'axios'
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function InsertionMedicament()  {
    const [alert, setAlert] = useState('')
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [posologie, setPosologie] = useState('')
    const [fabriquant, setFabriquant] = useState('')

    useEffect(() => {
        setAlert('')
    }, [])
    const newMedicament = async() =>{
       console.log("go")
        const {data} = await axios.post('https://irc-o1g5.onrender.com/medicament/create',
        {
            nom,
            description,
            posologie,
            fabriquant
        })
        console.log("newMedicament:"+data)
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
                    <h2 className='headTitle'>Insertion médicament</h2>  <br /><a href="/listeMedicament">Voir la liste</a>
                

                   <div className='form'> <TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic" label="Nom" variant="outlined"  /> </div>
                    <div className='form'> 
                        <InputLabel>Desciption</InputLabel>
                        <TextareaAutosize
                            onChange={e => {setDescription(e.target.value)}}
                            minRows={4}
                            defaultValue=""
                            style={{ width: 500, opacity: '.8', fontFamily: 'Poppins', padding: '5px' }}
                        />
                    </div>
                    <div className='form'> 
                        <InputLabel>Posologie</InputLabel>
                        <TextareaAutosize
                            onChange={e => {setPosologie(e.target.value)}}
                            minRows={3}
                            defaultValue=""
                            style={{ width: 500, opacity: '.8', fontFamily: 'Poppins', padding: '5px' }}
                        />
                    </div>
                   <div className='form'> <TextField onChange={e => {setFabriquant(e.target.value)}} className="text-field"  id="standard-basic" label="Fabriquant" variant="outlined"  /> </div> <br /><br />
                    <Button variant="contained" style={{background: '#00988B'}} onClick={newMedicament}> Ajouter </Button> <br />
                    { alert===false && <AlertError message="Erreur - Ce médicament est déjà enregistré!"/>}
                    { alert===true && <AlertSuccess message="Succès - Medicamennt ajouté."/>}
                </div>
            </Grid>
        </Grid>
     </div>
    )
}
