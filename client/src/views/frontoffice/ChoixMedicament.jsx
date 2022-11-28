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
import { useSelector, useDispatch} from 'react-redux';
import {showUserId, showSession } from '../../features/utilisateurSlice'
import {setPanier, addToPanier, changeItemValue, deleteItem, showPanier } from '../../features/panierSlice'


export default function ChoixMedicament() {
  const dispatch = useDispatch()
  const userId = useSelector(showUserId)
  const session = useSelector(showSession)
  const panier = useSelector(showPanier)

  const navigate = useNavigate();
  const [medicaments, setMedicaments] = useState([])
  const [text, setText] = useState('')
  const [suggests, setSuggests] = useState('')
  // const [panier, setPanier] = useState([])
  const [increment, setIncrement] = useState(1)
  const [prix, setPrix] = useState(0)

  const submit = () => {
    console.log(panier);
    // const panierClone = [...panier]
    // panierClone.forEach(element => {
    //   getPriceMedicament(element.id_medicament)
    //   console.log("VIDINY:"+prix);
    //   element.prix = prix
    // });
    // setPanier([...panierClone])
    // localStorage.clear();
    
    // localStorage.setItem('card', JSON.stringify(panier))
    // console.log("CARDSESS:"+localStorage.getItem('card'))

    navigate('/choixPrestataire')   
  }
  useEffect(() => {
    if(session === null) navigate('/')
      const loadMedicaments = async () =>{
          const {data} = await axios.get('http://localhost:5000/medicament/findAll')
          setMedicaments(data)
      } 
      loadMedicaments()
      setIncrement(1)
  }, [])

  // const getPriceMedicament = async (id_medicament) =>{
  //   const {data} = await axios.post('http://localhost:5000/medicament/getPrice',
  //     {
  //       id_medicament: id_medicament,
  //       id_prestataire: 46
  //     })
  //     setPrix(data[0].prix)
  //     // return data[0].prix
  // } 
  const changeValue = (id,value) =>{
    const panierClone = [...panier]
    let itemFind = panierClone.findIndex( pp => pp.id === id)
    panierClone[itemFind].quantite = value
    setPanier([...panierClone])
  }

  // const getPriceMedicament = async(id_medicament) => {
  //   try {
  //       const {data} = await axios.post('http://localhost:5000/medicament/getPrice',
  //         {
  //           id_medicament: id_medicament,
  //           id_prestataire: localStorage.getItem('id_prestataire')
  //         })
  //         return data[0].prix
  //   } catch (error) {
  //       console.log(error)
  //   }
  // } 
  const onSuggestHandler = async(id_medicament, nom_medicament) => {
    // const price = await getPriceMedicament(id_medicament)
    let item = {id: increment ,id_medicament: id_medicament,nom: nom_medicament,prix: 0 ,quantite: 1} //Obtenir prix du médicament
    // const panierCopy = [...panier]
    // panierCopy.push(item)
    // setPanier([...panierCopy])
    console.log("panier:"+panier)
    dispatch(addToPanier(item))
    setIncrement(increment+1)
    setSuggests('')
  }

  const onChangeHandler = (text) =>{
    console.log("aa")
    let matches=[]
    if(text.length > 0){
        matches = medicaments.filter( medicament => {
        const regex = new RegExp( `${text}`, 'gi')
        return medicament.nom.match(regex)
      })        
    }
    setSuggests(matches)
    setText(text)
  }
  const removeElement = (id) =>{
    var panierCopy = [...panier]
    panierCopy = panierCopy.filter( item => item.id !== id)
    setPanier([...panierCopy])
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
       <Header/> 
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} >
          <div className='autocompletion'>
          <h2 id="title">Achat médicament(s):</h2> <br />
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
        <Grid item xs={12} md={6} >
          <div className='panier'>
            <h4>Panier</h4>
          <ul >
        {panier && panier.map( pp => 
          <li key={pp.id} style={{borderRadius: '5px'}}>  <div id="item-name"><p> {pp.nom}</p></div> <div id="item-quantity"><p>Quantite</p>  <Input style={{background:'white',width:'70px', padding:'3%', height: '25px', marginTop:'5%'}} type="number" min="1"  value={pp.quantite} onChange={(e) => {dispatch(changeItemValue({id: pp.id, value: e.target.value}))} } />
          <a href="#" onClick={ () => dispatch(deleteItem(pp.id))} style={{color: 'white'}}>Supprimer</a>
          </div>

          </li>  
        )}
      </ul>
          </div>
      <div className="button"><Button id="btn" variant="contained"  onClick={submit} style={{width: '25%'}}> Valider </Button></div>

        </Grid>
      </Grid>
    </div>
  )
}
