import React, { Component } from 'react';
import '../../assets/css/Abonnement.css'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'


import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';

import axios from 'axios'
import { subscribeOn } from 'rxjs';

const useStyles = makeStyles({
    btn2: {
        background:'red',
    }    
})

const cookies = new Cookies();
export default function Abonnement()  {
    const classes = useStyles();
    const [token, setToken] = useState(cookies.get('jwt'))
    const [alert, setAlert] = useState('')
    
    const [abonnements, setAbonnements] = useState([])
    
    useEffect(() => {
        const getAllAbonnement  = async () => {
            const  {data}  = await axios.get(`https://irc-o1g5.onrender.com/abonnement/findAll`);
            //console.log(data)
            setAbonnements(data)
        }
        getAllAbonnement()
        setAlert('')
    }, [])
    
    const subscribe  = async (id_abonnement) => {
        const  {data}  = await axios.post(`https://irc-o1g5.onrender.com/subscribe`, {id_abonnement , token: localStorage.getItem('session')});
        console.log(data)
        if(data){
            setAlert(true)
        }else{
            setAlert(false)
        }
    }
    
    
    return (
        <div>
            <Grid container spacing={1} disableElevation >
            
                {
                    abonnements.map( abonnement =>

                        <Grid item xs={12} md={4}  key={abonnement.id} >
                            
                                <Card className="card">
                                    <CardContent>
                                        <h2  className="cardHeader">{abonnement.nom}</h2>
                                        <h1   className="price">{(parseInt(abonnement.tarif)).toLocaleString()} Ar</h1><br />
                                        <p   className="details">{abonnement.description}</p>
                                    <div className="subscribe-btn"> <Button  variant="contained" onClick={()=> {console.log("clix"); subscribe(abonnement.id)}} >Se souscrire</Button></div>
                                
                                    </CardContent>
                                </Card>
                        </Grid> 
                  )                
                }
                
                { alert===false && <AlertError message="Vous avez encore un abonnement valable."/>}
                { alert===true && <AlertSuccess message="Votre abonnement a été effectué avec succès" />}
              
            </Grid>
        </div>
    );
   
}

