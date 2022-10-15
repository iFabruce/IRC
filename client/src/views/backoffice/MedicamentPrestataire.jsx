import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid'
import '../../assets/css/ChoixMedicament.css'
import '../../assets/css/MedicamentPrestataire.css'

import Header from '../../components/Header'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { Input,Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';


export default function MedicamentPrestataire() {
    const navigate = useNavigate();
    const [idPs, setIdPs] = useState('')
    const [idMd, setIdMd] = useState('')
    const [prestataires, setPrestataires] = useState([])
    const [myMedocs, setMyMedocs] = useState([])
    const [resteMedoc, setResteMedoc] = useState([])
    const [textPs, setTextPs] = useState('')
    const [textMd, setTextMd] = useState('')
    const [suggestsPs, setSuggestsPs] = useState('')
    const [isSuggestedPs, setIsSuggestedPs] = useState(true)
    const [suggestsMd, setSuggestsMd] = useState('')
    const [modif, setModif] = useState(0)
    const [prix, setPrix] = useState('')
    const [newPrix, setNewPrix] = useState(0)



  
    useEffect(() => {
      const getAllPrestataire = async (idp) =>{
        const {data} = await axios.get('http://localhost:5000/prestataire/findAll')
        setPrestataires(data)
      } 
      getAllPrestataire()

    }, [])
    const deleteMedicament = async (id_prestataire, id_medicament) =>{
      const {data} = await axios.post('http://localhost:5000/prestataire/deleteMedicament',{
       id_prestataire,id_medicament
     })

     if(data){
      getAddedMedicaments(id_prestataire)
     }
      
   } 

    const addOrChangeMedicament = async (id_prestataire, id_medicament,prix) =>{
       await axios.post('http://localhost:5000/prestataire/addOrChangePriceMedicament',{
        id_prestataire,id_medicament,prix
      })
      getAddedMedicaments(id_prestataire)
      setModif(0)
    } 

    const getAddedMedicaments = async (idp) =>{
      const {data} = await axios.get('http://localhost:5000/prestataire/getAddedMedicaments/'+idp)
      setMyMedocs(data)
      console.log("add update")

    } 
    const getNonAddedMedicaments = async (idp) =>{
      const {data} = await axios.get('http://localhost:5000/prestataire/getNonAddedMedicaments/'+idp)
      setResteMedoc(data)
      console.log(resteMedoc)
    }
    //RECHERCHE
    const onSearchPrestataire = (text) =>{
      let matches=[]
      if(text.length > 0){
        matches = prestataires.filter( ps => {
          const regex = new RegExp( `${text}`, 'gi')
          return ps.nom.match(regex)
        })        
      }
      setSuggestsPs(matches)
      setTextPs(text)
    }
    const onSearchMedicament = (text) =>{
      let matches=[]
      if(text.length > 0){
        matches = resteMedoc.filter( rm => {
          const regex = new RegExp( `${text}`, 'gi')
          return rm.nom.match(regex)
        })        
      }
      setSuggestsMd(matches)
      setTextMd(text)
    }
    //CHOIX
    const onChoicePrestataire = (id,nom) => {
      setTextPs(nom)
      setSuggestsPs([])
      getAddedMedicaments(id)
      getNonAddedMedicaments(id)
      setIdPs(id)

    }
    const onChoiceMedicament = (id,nom) => {
      setTextMd(nom)
      setSuggestsMd([])
      setIdMd(id)
    }
    
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item sx={12} md={6} >
          <div className='autocompletion'>
          <h2 id="title">Ajout/changer prix médicament(s)</h2> <br />
         
          <div id="search"><InputLabel >Prestataire</InputLabel><br /> <TextField className="text-field"
              placeholder='ex: Pharmacie ABC...'
              value={textPs} 
              onChange={ e => onSearchPrestataire(e.target.value)}
            />
            {suggestsPs && suggestsPs.map( (suggest,i) => 
              <div className="suggest-list" key={i} onClick={ () => onChoicePrestataire(suggest.id,suggest.nom)}>{suggest.nom}</div>
            )}
          </div>

          <div id="search"><InputLabel >Médicament</InputLabel><br /> <TextField className="text-field"
              placeholder='ex: Amoxyciline...'
              value={textMd} 
              onChange={ e => onSearchMedicament(e.target.value)}
            />
            {suggestsMd && suggestsMd.map( (suggest,x) => 
              <div className="suggest-list" key={x} onClick={ () => onChoiceMedicament(suggest.id,suggest.nom)}>{suggest.nom}</div>
            )}
          </div>
          <div><br />
            <InputLabel >Prix</InputLabel>
            <TextField
              value={newPrix}
              onChange={e => {setNewPrix(e.target.value)}}
            />
          </div>
          <Button onClick={ () => { addOrChangeMedicament(idPs,idMd,newPrix) }}>Ajouter</Button>  
          </div>
        </Grid>
        <Grid item sx={12} md={6} >
          <div className='myMedocs'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} >
                  <TableHead>
                    <TableRow >
                        <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Prix</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {myMedocs && myMedocs.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{row.nom_medicament}</TableCell>
                    <TableCell component="th" scope="row">
                       {modif == 0 && row.prix }
                       {modif == row.id_medicament && <TextField
                         value={prix}
                         onChange={e => {setPrix(e.target.value)}}
                       /> }


                    </TableCell>
                      {modif == 0 && <TableCell  component="th" scope="row"> <Button onClick={ () => {setModif(row.id_medicament); setPrix(row.prix) }}>Modifier</Button>
                      <Button onClick={ () => {deleteMedicament(idPs,row.id_medicament) }}>Supprimer</Button> </TableCell>
                      } {modif == row.id_medicament &&  <div>
                          <TableCell  component="th" scope="row"> <Button onClick={ () => {setModif(0) }}>Annuler</Button> </TableCell>
                          <TableCell  component="th" scope="row"> <Button onClick={ () => {addOrChangeMedicament(row.id_prestataire,row.id_medicament,  prix)  }}>Valider</Button> </TableCell>
                          </div> 
                   }
                    </TableRow>
                ))}
                    </TableBody>
                    
                </Table>
              </TableContainer>
            </div>
        </Grid>
      </Grid>
    </div>
  )
}
