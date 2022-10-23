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

export default function ListeMedicament()  {
    const [alertUpdate, setAlertUpdate] = useState('')
    const [alertDelete, setAlertDelete] = useState('')
    const [id, setId] = useState('')
    const [nom, setNom] = useState('')
    const [description, setDescription] = useState('')
    const [posologie, setPosologie] = useState('')
    const [fabriquant, setFabriquant] = useState('')

    const [medicament, setMedicament] = useState()
    const [medicaments, setMedicaments] = useState('')
    const [page, setPage] = useState(null)

    const [numation, setNumation] = useState(0)
    const [total_page, setTotal_page] = useState([])
    
    const getAllMedicaments = async(num_page) =>{
        const {data} = await axios.get('http://localhost:5000/medicament/findAndCountAll/'+num_page)
        setMedicaments(data.users.rows)
        var tclone = []
        for(var x=0;x<data.total;x++){
            tclone.push(x)  
        }
        setTotal_page([...tclone])
        setNumation(num_page)
    }
    useEffect(() => {
        setPage('liste')
        getAllMedicaments(0)
    }, [])
    const onDelete = async (id) => {
        try{
            const {data} = await axios.delete(`http://localhost:5000/medicament/delete/${id}`)
            getAllMedicaments()
            setAlertDelete(data)
        }
        catch{

        }
    }
    const onUpdate = async(id) =>{
            setMedicament({})
            try{

                setId(id)
                const {data} = await axios.get(`http://localhost:5000/medicament/findOne/${id}`)
                setMedicament(data)
                setNom(medicament.nom)
                setDescription(medicament.description)
                setPosologie(medicament.posologie)
                setFabriquant(medicament.fabriquant)
    
                setPage('modification'); 
            }
            catch{

            }

    }
    const modifierMedicament = async () => {
        
        const {data} = await axios.post(`http://localhost:5000/medicament/update/${id}`,{
            nom,
            description,
            posologie,
            fabriquant,
           
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
                                <TableCell style={{fontWeight: 'bold'}}>Description</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Posologie</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Fabriquant</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {medicaments && medicaments.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">{row.nom}</TableCell>
                            <TableCell  component="th" scope="row">{row.description}</TableCell>
                            <TableCell  component="th" scope="row">{row.posologie}</TableCell>
                            <TableCell  component="th" scope="row">{row.fabriquant}</TableCell>
                            <TableCell  component="th" scope="row"> <Button onClick={ () => { onUpdate(row.id)}}>Modifier</Button> </TableCell>
                            <TableCell  component="th" scope="row"> <Button onClick={ () => { onDelete(row.id)}}>Supprimer</Button> </TableCell>
                          
                            </TableRow>
                        ))}
                            </TableBody>
                            
                        </Table>
                        { alertDelete===false && <AlertError message="Erreur lors du suppression"/>}
                        { alertDelete===true && <AlertSuccess message="Suppression terminé."/>}
                    </TableContainer> <br />
                    <h5>PAGE {numation+1}</h5> 
                            <br />
                            <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllMedicaments(numation-1)
                                    }
                                }
                            }>Précedent</a> -
                    {total_page.map(i => ( <a href="#" onClick={ () => getAllMedicaments(i)} style={{textDecoration: 'none',padding: '1%'}}> {i+1} </a> ))}
                    - <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllMedicaments(numation+1)
                                    }
                                }
                            }>Suivant</a>
                    </div>}
                    {page == 'modification' && <div >
                    <h2 className='headTitle'>Modification médicament</h2><br />
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
                   
                    <div className='form'> 
                        <InputLabel>Posologie</InputLabel>
                        <TextareaAutosize
                            onChange={e => {setPosologie(e.target.value)}}
                            minRows={3}
                            value={posologie}
                            style={{ width: 300, opacity: '.8', fontFamily: 'Montserrat', padding: '5px' }}
                        />
                    </div>
                   <div className='form'> <InputLabel>Fabriquant</InputLabel> <TextField onChange={e => {setFabriquant(e.target.value)}}  type="text" id="standard-basic"  variant="outlined"   value={fabriquant} /> </div> 

<br />

                  
                    <Button variant="contained" style={{background: '#00988B'}} onClick={modifierMedicament}> Modifier </Button> <br />
                    { alertUpdate===false && <AlertError message="Erreur - Veuillez vérifier tous les champs."/>}
                        { alertUpdate===true && <AlertSuccess message="Succès -  Modification appliquée."/>}
                </div> }
            </Grid>
        </Grid>
     </div>
    )
}
