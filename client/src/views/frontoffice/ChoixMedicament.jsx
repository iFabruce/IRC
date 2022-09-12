import axios from 'axios';
import React from 'react'
import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid'
import '../../assets/css/ChoixMedicament.css'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'


export default function ChoixMedicament() {
    const navigate = useNavigate();
    const [medicaments, setMedicaments] = useState([])
    const [text, setText] = useState('')
    const [suggests, setSuggests] = useState('')
    const [panier, setPanier] = useState([])
    const [increment, setIncrement] = useState(1)

    const submit = () => {
      localStorage.setItem('panier', JSON.stringify(panier))
      navigate('/choixPrestataire')   
    }
    useEffect(() => {
        const loadMedicaments = async () =>{
            const {data} = await axios.get('http://localhost:5000/medicament/findAll')
            // console.log(data)
            setMedicaments(data)
        } 
        loadMedicaments()
        setIncrement(1)
    }, [])


    const changeValue = (id,value) =>{
      const panierClone = [...panier]
      console.log("length:"+panierClone.length)
      // panierClone.map(ps => {console.log(ps.id)})
      let itemFind = panierClone.findIndex( pp => pp.id === id)
      console.log("itemFIND:"+itemFind)
      panierClone[itemFind].quantite = value
      setPanier(panierClone)
      
      panier.map( px => console.log("nom:"+px.nom+ " quantite:"+px.quantite))
    }

    const onSuggestHandler = (id_medicament, nom_medicament) => {
      // setText(text)
      let item = {id: increment ,id_medicament: id_medicament,nom: nom_medicament, quantite: 1}
      const panierCopy = [...panier]
      //Si le produit sélectionné est déjà dans le panier
      let indexFind = panierCopy.findIndex( pp => pp.nom === nom_medicament)
      if(indexFind != -1){
        panierCopy[indexFind].quantite++
      }else{
        panierCopy.push(item)
      }
      setPanier(panierCopy)
      setIncrement(increment+1)
      console.log(panier)
    }

    const onChangeHandler = (text) =>{
      console.log("aa")
      let matches=[]
      if(text.length > 0){
          matches = medicaments.filter( medicament => {
          const regex = new RegExp( `${text}`, 'gi')
          // console.log("regex:"+regex)
          return medicament.nom.match(regex)
        })        
      }
      // console.log(matches.map(match => console.log(match.nom)))
      setSuggests(matches)
      setText(text)
    }
    
  return (
    <div>
      {/* <input type="text" value={text} onChange={ e => onChangeHandler(e.target.value)}/>
      {suggests && suggests.map( (suggest,i) => 
        <div key={i} onClick={ () => onSuggestHandler(suggest.nom)}>{suggest.nom}</div>
      )}
      <br />
      <ul>
        {panier && panier.map( pp => 
          <li key={pp.id}>{pp.nom} <input type="number" min="1" value={pp.quantite} onChange={(e) => {changeValue(pp.id,e.target.value)} } /></li>  
        )}
      </ul> */}
      <Grid container spacing={0}>
        <Grid item sx={12} md={6} >
          <div className='autocompletion'>
          <h2 id="title">Achat médicament(s)</h2> <br />
          <div id="search"><InputLabel >Recherchez ici le(s) médicaments:</InputLabel><br /> <TextField className="text-field"
              placeholder='ex: amoxycline...'
              value={text} 
              onChange={ e => onChangeHandler(e.target.value)}
            />
          {suggests && suggests.map( (suggest,i) => 
            <div className="suggest-list" key={i} onClick={ () => onSuggestHandler(suggest.id,suggest.nom)}>{suggest.nom}</div>
          )}
      
      
            </div>
          </div>
        </Grid>
        <Grid item sx={12} md={6} >
          <div className='panier'>
            <h4>Panier</h4>
          <ul >
        {panier && panier.map( pp => 
          <li key={pp.id}>  <div id="item-name"><p> {pp.nom}</p></div> <div id="item-quantity"><p>Quantite</p>  <Input style={{background:'white',width:'70px', padding:'3%', height: '25px', marginTop:'5%'}} type="number" min="1"  value={pp.quantite} onChange={(e) => {changeValue(pp.id,e.target.value)} } /></div></li>  
        )}
      </ul>
      <Button variant="contained" className="button" onClick={submit} > Valider </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
