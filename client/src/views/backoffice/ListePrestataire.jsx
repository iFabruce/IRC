import HeaderBackoffice from '../../components/HeaderBackoffice'
import AlertError from '../../components/AlertError'
import AlertSuccess from '../../components/AlertSuccess'
import React, { useState, useEffect} from 'react'
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import '../../assets/css/InsertionUtilisateur.css'
import axios from 'axios'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { createSearchParams } from 'react-router-dom';

export default function ListePrestataire()  {
    const [alertUpdate, setAlertUpdate] = useState('')
    const [alertDelete, setAlertDelete] = useState('')
    const [id, setId] = useState('')
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [ouverture, setOuverture] = useState('')
    const [fermeture, setFermeture] = useState('')
    const [adresse, setAdresse] = useState('')
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [photo, setPhoto] = useState('')

    const [prestataire, setPrestataire] = useState()

    const [prestataires, setPrestataires] = useState('')
    const [page, setPage] = useState(null)

    const [numation, setNumation] = useState(0)
    const [total_page, setTotal_page] = useState([])
    
    const getAllPrestataire = async(num_page) =>{
        const {data} = await axios.get('http://localhost:5000/prestataire/findAndCountAll/'+num_page)
        setPrestataires(data.users.rows)
        var tclone = []
        for(var x=0;x<data.total;x++){
            tclone.push(x)  
        }
        setTotal_page([...tclone])
        setNumation(num_page)
    }
    useEffect(() => {
        setPage('liste')
        getAllPrestataire(0)
    }, [])
    const onDelete = async (id) => {
        try{
            const {data} = await axios.delete(`http://localhost:5000/prestataire/delete/${id}`)
            getAllPrestataire()
            setAlertDelete(data)
        }
        catch{

        }
    }
    const onUpdate = async(id) =>{
            setPrestataire({})
            try{

                setId(id)
                const {data} = await axios.get(`http://localhost:5000/prestataire/findOne/${id}`)
                
                setPrestataire(data)
                setNom(prestataire.nom)
                setDescription(prestataire.description)
                setOuverture(prestataire.ouverture)
                setFermeture(prestataire.fermeture)
                setDescription(prestataire.description)
                setAdresse(prestataire.adresse)
                setLongitude(prestataire.longitude)
                setLatitude(prestataire.latitude)
    
                setPage('modification'); 
            }
            catch{

            }

    }
    const modifierPrestataire = async () => {
        console.log("long:"+prestataire.longitude)
        console.log("lat:"+prestataire.latitude)
        console.log("padd:"+prestataire.adresse+" adrresy:"+adresse)
        const {data} = await axios.post(`http://localhost:5000/prestataire/update/${id}`,{
            nom,
            description,
            ouverture,
            fermeture,
            adresse,
            longitude,
            latitude,
            photo,
        })
        setAlertUpdate(data)
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
               {page == 'liste' && <div className='table'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} >
                            <TableHead>
                            <TableRow >
                                <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Adresse</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Ouverture</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Fermeture</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {prestataires && prestataires.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">{row.nom}</TableCell>
                            <TableCell  component="th" scope="row">{row.adresse}</TableCell>
                            <TableCell  component="th" scope="row">{row.ouverture}</TableCell>
                            <TableCell  component="th" scope="row">{row.fermeture}</TableCell>
                            <TableCell  component="th" scope="row"> <Button onClick={ () => { onUpdate(row.id)}}>Modifier</Button> </TableCell>
                            <TableCell  component="th" scope="row"> <Button onClick={ () => { onDelete(row.id)}}>Supprimer</Button> </TableCell>
                          
                            </TableRow>
                        ))}
                            </TableBody>
                            
                        </Table>
                        { alertDelete===false && <AlertError message="Erreur lors du suppression"/>}
                        { alertDelete===true && <AlertSuccess message="Suppression terminé."/>}
                    </TableContainer> <br />
                    {numation>=0 &&  <h5>PAGE {numation+1}</h5> }
                            <br />
                            <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllPrestataire(numation-1)
                                    }
                                }
                            }>Précedent</a> -
                    {total_page.map(i => ( <a href="#" onClick={ () => getAllPrestataire(i)} style={{textDecoration: 'none',padding: '1%'}}> {i+1} </a> ))}
                    - <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllPrestataire(numation+1)
                                    }
                                }
                            }>Suivant</a>
                    </div>}
                    {page == 'modification' && <div >
                    <h2 className='headTitle'>Insertion prestataire</h2><br />
                    <div className='form'>  <InputLabel>Nom</InputLabel><TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic"  variant="outlined"  value={nom}/> </div>
                    <div className='form'> 
                        <InputLabel>Desciption</InputLabel>
                        <TextareaAutosize
                            onChange={e => {setDescription(e.target.value)}}
                            minRows={4}
                            value={description}
                            style={{ width: 500, opacity: '.8', fontFamily: 'Montserrat', padding: '5px' }}
                        />
                    </div>
                   
                   <div className='form'> <InputLabel>Heure d'ouverture</InputLabel> <TextField onChange={e => {setOuverture(e.target.value)}}  type="time" id="standard-basic"  variant="outlined" value={ouverture} /> </div>
                   <div className='form'> <InputLabel>Heure de fermeture</InputLabel> <TextField onChange={e => {setFermeture(e.target.value)}}  type="time" id="standard-basic"  variant="outlined"   value={fermeture} /> </div> 
                   <div className='form'> <TextField onChange={e => {setAdresse(e.target.value)}}  id="standard-basic" label="Adresse" variant="outlined" value={adresse}  /> </div> <br /> <br />

                   <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Coordonnées</h4> 
                   <div className='form'> <InputLabel>Longitude</InputLabel> <TextField onChange={e => {setLongitude(e.target.value)}}  id="standard-basic"  variant="outlined"    value={longitude}/> </div>
                   <div className='form'><InputLabel>Latitude</InputLabel>  <TextField onChange={e => {setLatitude(e.target.value)}} id="standard-basic"  variant="outlined"  value={latitude} /> </div> <br />


                  
                    <Button variant="contained" style={{background: '#00988B'}} onClick={modifierPrestataire}> Modifier </Button> <br />
                    { alertUpdate===false && <AlertError message="Erreur - Veuillez vérifier tous les champs."/>}
                        { alertUpdate===true && <AlertSuccess message="Succès -  Modification appliquée."/>}
                </div> }
            </Grid>
        </Grid>
     </div>
    )
}
