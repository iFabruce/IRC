import HeaderBackoffice from '../../components/HeaderBackoffice'
import AlertError from '../../components/AlertError'
import AlertSuccess from '../../components/AlertSuccess'
import React, { useState, useEffect} from 'react'
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import '../../assets/css/InsertionUtilisateur.css'
import axios from 'axios'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function ListeUtilisateur()  {
    const navigate = useNavigate()
    const [alertUpdate, setAlertUpdate] = useState('')
    const [alertDelete, setAlertDelete] = useState('')
    const [id, setId] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [date_naissance, setDate_naissance] = useState('')
    const [sexe, setSexe] = useState('')
    const [adresse, setAdresse] = useState('')
    const [situation_matrimonial, setSituation_matrimonial] = useState('')
    const [login, setLogin] = useState('')
    const [mot_de_passe, setMot_de_passe] = useState('')
    const [telephone, setTelephone] = useState('')
    const [reference, setReference] = useState('')


    const [utilisateur, setUtilisateur] = useState()
    const [utilisateurs, setUtilisateurs] = useState('')
    const [page, setPage] = useState(null)

    // const [num_page, setNum_page] = useState(0)
    // const [total, setTotal] = useState()
    const [numation, setNumation] = useState(0)

    const [total_page, setTotal_page] = useState([])


    const [choixSituation, setChoixSituation] = useState(
        ['célibataire', 'marié(e)', 'divorcé(e)', 'veuf(ve)']
    )
    

    const getAllUtilisateurs = async(num_page) =>{
        console.log("go")
        const {data} = await axios.get('https://irc-backend.vercel.app/utilisateur/findAndCountAll/'+num_page)
        console.log("users:"+data.users.rows)
        setUtilisateurs(data.users.rows)
        var tclone = []
        console.log("total:"+data.total)

        for(var x=0;x<data.total;x++){
            tclone.push(x)  
        }
        console.log("tclone:"+tclone)
        setTotal_page([...tclone])
        setNumation(num_page)
    }
    useEffect(() => {
        setPage('liste')
        getAllUtilisateurs(0)
       
    }, [])

    // const onDelete = async (id) => {
    //     try{
    //         const {data} = await axios.delete(`https://irc-backend.vercel.app/utilisateur/delete/${id}`)
    //         getAllUtilisateurs()
    //         setAlertDelete(data)
    //     }
    //     catch{

    //     }
    // }
    const onDelete = async(id) =>{
         await axios.get(`https://irc-backend.vercel.app/utilisateur/delete/${id}`)
        getAllUtilisateurs(0)
        // navigate('/listeUtilisateur')
        
    }
    const onUpdate = async(id) =>{
        console.log('clix')
        setUtilisateur({})
        try{
            console.log('a')
            setId(id)
            const {data} = await axios.get(`https://irc-backend.vercel.app/utilisateur/findOne/${id}`)
            setUtilisateur(data)
            setNom(utilisateur.nom)
            setPrenom(utilisateur.prenom)
            setDate_naissance(utilisateur.date_naissance)
            setAdresse(utilisateur.adresse)
            setSexe(utilisateur.sexe)
            setSituation_matrimonial(utilisateur.situation_matrimonial)
            setTelephone(utilisateur.telephone)
            setReference(utilisateur.reference)
            
            setPage('modification'); 

        }
        catch{

        }

    }
    const modifierUtilisateur = async () => {
        
        const {data} = await axios.post(`https://irc-backend.vercel.app/utilisateur/update/${id}`,{
            nom,
            prenom,
            adresse,
            sexe,
            date_naissance,
            situation_matrimonial,
            telephone,
            reference
           
        })
        setAlertUpdate(data)
        getAllUtilisateurs(0)
        setPage('liste')
        
    }
    /************CONFIRM**************/
    const onConfirmDelete = (id) =>{
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' >
                  <h1>Confirmation de la suppression</h1>
                  <p>Voulez-vous vraiment valider la suppression?</p> <br />
                  <Button disableElevation variant="contained" style={{background: 'red'}}  
                    onClick={() => {
                        onDelete(id)
                        onClose();
                    }}
                  >
                    Oui
                  </Button> 
                  
                  <Button disableElevation variant="outlined" onClick={onClose} style={{marginLeft: '2%'}}>Non</Button> 
                </div>
              );
            }
          });
    }
    const onConfirmUpdate = () =>{
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' >
                  <h1>Confirmation de la modification</h1>
                  <p>Voulez-vous vraiment valider la modification?</p> <br />
                  <Button disableElevation variant="contained" style={{background: '#00988B'}}  
                    onClick={() => {
                      modifierUtilisateur()
                      onClose();
                    }}
                  >
                    Oui
                  </Button> 
                  
                  <Button disableElevation variant="outlined" onClick={onClose} style={{marginLeft: '2%'}}>Non</Button> 
                </div>
              );
            }
          });
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
               <h2 className='headTitle'>Liste utilisateur</h2><br /><br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} >
                            <TableHead>
                            <TableRow >
                                <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Prenom</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Sexe</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Situation Matrimonial</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Adresse</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Date de naissance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {utilisateurs && utilisateurs.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">{row.nom}</TableCell>
                            <TableCell  component="th" scope="row">{row.prenom}</TableCell>
                            <TableCell  component="th" scope="row">{row.sexe}</TableCell>
                            <TableCell  component="th" scope="row">{row.situation_matrimonial}</TableCell>
                            <TableCell  component="th" scope="row">{row.adresse}</TableCell>
                            <TableCell  component="th" scope="row">{row.date_naissance}</TableCell>

                            <TableCell  component="th" scope="row"> <EditIcon style={{ cursor: 'pointer'}} onClick={ () => { onUpdate(row.id)}}/></TableCell>
                            <TableCell  component="th" scope="row"> <DeleteIcon style={{ cursor: 'pointer'}} onClick={ () => { onConfirmDelete(row.id)}}/></TableCell>

                          
                            </TableRow>
                        ))}
                            </TableBody>
                            
                        </Table>
                        {/* / console.log("TOTAL PAGE:"+total_page) */}
                        
                    
                        { alertDelete===false && <AlertError message="Erreur lors du suppression"/>}
                        { alertDelete===true && <AlertSuccess message="Suppression terminé."/>}
                    </TableContainer> <br />
                    <h5>PAGE {numation+1}</h5> 
                            <br />
                            <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllUtilisateurs(numation-1)
                                    }
                                }
                            }>Précedent</a> -
                    {total_page.map(i => ( <a href="#" onClick={ () => getAllUtilisateurs(i)} style={{textDecoration: 'none',padding: '1%'}}> {i+1} </a> ))}
                    - <a href="#" onClick={ () => {
                                    if(numation >= 0){
                                        getAllUtilisateurs(numation+1)
                                    }
                                }
                            }>Suivant</a>
                    
                            
                    </div>}
                   
                    
                    {page == 'modification' && <div >
                    <div>
                    <h2 className='headTitle'>Modification utilisateur</h2><br /><br />
                    <h4  style={{paddingBottom: '1%',borderBottom: '1px solid grey',color:'grey',opacity: '.8'}}>Informations personnelles</h4> 

                   <div className='form'> <TextField onChange={e => {setNom(e.target.value)}} className="text-field"  id="standard-basic" label="Nom" variant="outlined"  value={nom} /> </div>
                   <div className='form'> <TextField onChange={e => {setPrenom(e.target.value)}} className="text-field"  id="standard-basic" label="Prénom" variant="outlined"  value={prenom} /></div>
                   <div className='form-date'>  <InputLabel >Date de naissance</InputLabel> <TextField    onChange={e => {setDate_naissance(e.target.value)}} id="standard-basic"  variant="outlined" type="date" value={date_naissance}  /></div>
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
                   <div className='form'> <TextField  onChange={e => {setAdresse(e.target.value)}} id="standard-basic" label="Adresse" variant="outlined" value={adresse}  /></div>
                   </div>
                <FormControl style={{marginTop: '3%', width:'230px'}}>
                    <InputLabel >Situation matrimonial</InputLabel>
                    <Select
                        id="standard-select"
                        value={situation_matrimonial}
                        label="Situation matrimonial"
                        onChange={e => {setSituation_matrimonial(e.target.value)}}
                    >
                        <MenuItem value={'Célibataire'}>célibataire</MenuItem>
                        <MenuItem value={'Marié(e)'}>marié(e)</MenuItem>
                        <MenuItem value={'Divorcé(e)'}>divorcé(e)</MenuItem>
                        <MenuItem value={'Veuf(ve)'}>veuf(ve)</MenuItem>
                    </Select>
                </FormControl>
                <div className='form'> <TextField onChange={e => {setTelephone(e.target.value)}} className="text-field"  id="standard-basic" label="Telephone"  variant="outlined"  value={telephone} /> </div>
                <div className='form'> <TextField onChange={e => {setReference(e.target.value)}}  className="text-field"  id="standard-basic" label="Reference"  variant="outlined"  value={reference} /> <a href="#" onClick={ () => setReference(telephone)}>Créer mon propre portefeuille</a></div>



                      
<br /> <br />

                  
                    <Button variant="contained" style={{background: '#00988B'}} onClick={onConfirmUpdate}> Modifier </Button> <br />
                    { alertUpdate===false && <AlertError message="Veuillez vérifier tous les champs."/>}
                        { alertUpdate===true && <AlertSuccess message="Modification appliquée."/>}
                </div> }
            </Grid>
        </Grid>
     </div>
    )
}
