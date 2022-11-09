import React from 'react'
import { Grid,Card, CardContent, Paper, Button, TextField, FormControl,MenuItem, Select, InputLabel } from '@mui/material';
import '../../assets/css/ValidationCoDebit.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {showSession} from '../../features/utilisateurSlice'
import { useSelector } from 'react-redux';

export default function ValidationCoDebit() {
    const navigate = useNavigate();
    const session = useSelector(showSession)
    const [list, setList] = useState([])
    
    const loadData = async() => {
        const {data} = await axios.get(`http://localhost:5000/codebit/getAllWithDetails`);
        setList(data)
    }
    useEffect(() => {
        if(session === null) navigate('/')
        loadData()
    }, [])

    const submit = async(id_achat,montant,decision) => {
        console.log("c");
        const {data} = await axios.post(`http://localhost:5000/achat/validation_codebit`,
        {
            id_utilisateur: localStorage.getItem('id_utilisateur'),
            achat: id_achat,
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
                    <p style={{color:'grey'}}>En attente: 3</p>
                    
                    {list.length!=0 && list.map( element => 
                        <div className="item" key={element.id_achat}>
                            <div className="left">
                                <h2>{element.nom} {element.prenom}</h2>
                                <p>{element.telephone}</p> <br /> 
                                <p style={{fontWeight:'600'}}><LocationOnIcon />{element.adresse}</p>
                            </div>
                            <div className="right">
                                <p>20 Oct 2022</p> <br />
                                <p style={{fontWeight:'600'}}>{element.montant} Ar</p> <br />

                                <div className='btn'>
                                    <Button variant="contained" disableElevation style={{background: '#00B862'}} onClick={() => submit(element.id_achat,element.montant,true)}>Valider</Button>
                                    <Button variant="contained" disableElevation style={{background: '#FFD500', marginLeft: '10%'}} onClick={() => submit(element.id_achat,element.montant,false)}>Ignorer</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}
