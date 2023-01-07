import React from 'react'
import { Grid,Card, CardContent, Paper, Button, TextField, FormControl,MenuItem, Select, InputLabel } from '@mui/material';
import '../../assets/css/ValidationCoDebit.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {showSession, showUserId} from '../../features/utilisateurSlice'
import { useSelector } from 'react-redux';

export default function ValidationCoDebit() {
    const navigate = useNavigate();
    const session = useSelector(showSession)
    const userId = useSelector(showUserId) 

    const [list, setList] = useState([])
    
    const loadData = async() => {
        const {data} = await axios.get(`https://irc-backend.vercel.app/codebit/getAllWithDetails/${userId}`);
        setList(data)
    }
    useEffect(() => {
        if(session === null) navigate('/')
        loadData()
    }, [])

    const submit = async(id_achat,montant,decision) => {
        console.log("id_achat:"+id_achat);
        const {data} = await axios.post(`https://irc-backend.vercel.app/achat/validation_codebit`,
        {
            id_utilisateur: userId,
            id_achat: id_achat,
            amount: montant,
            decision
        })
        console.log(data);
        loadData()
    }
    
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} md={12}>
                <div id="center">
                    <h2>Validation co-débit</h2>
                    <p style={{color:'grey'}}>En attente: {list.length}</p>
                    
                    {list.length!=0 && list.map( element => 
                        <div className="item" key={element.id_achat}>
                            <div className="left">
                                <h2>{element.nom} {element.prenom}</h2>
                                <p>{element.telephone}</p> <br /> 
                                <p style={{fontWeight:'600'}}><LocationOnIcon />{element.adresse}</p>
                            </div>
                            <div className="right">
                                <p>20 Oct 2022</p> <br />
                                <p style={{fontWeight:'600'}}>{(parseInt(element.montant)).toLocaleString()} Ar</p> 
                                
                                    <Button className="btn-choice1" variant="contained" disableElevation style={{background: '#00B862'}} onClick={() => submit(element.id_achat,element.montant,true)}>Valider</Button>
                                    <Button className="btn-choice2" variant="contained" disableElevation style={{background: '#FFD500'}} onClick={() => submit(element.id_achat,element.montant,false)}>Ignorer</Button>
                           
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}
