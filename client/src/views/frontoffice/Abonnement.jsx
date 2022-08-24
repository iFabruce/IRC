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
            const  {data}  = await axios.get(`http://localhost:5000/abonnement/findAll`);
            //console.log(data)
            setAbonnements(data)
        }
        getAllAbonnement()
        setAlert('')
    }, [])
    
    const subscribe  = async (id_abonnement) => {
        console.log("id_abonnement:"+id_abonnement + " and  id_user:"+token)
        const  {data}  = await axios.get(`http://localhost:5000/subscribe/${token}/${id_abonnement}`);
        console.log(data)
        if(data){
            console.log(data)
            setAlert(true)
            console.log("alert:"+data)

        }else{
            console.log(data)

            setAlert(false)
            console.log("alert:"+data)

        }
    }
    
    
    return (
        <div>
            <Grid container spacing={2} disableElevation className='container'>
                
                {
                    
                    abonnements.map( abonnement =>
             

                        <Grid item sx={12} md={4} className="item" key={abonnement.id}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h4" color="primary" className="cardHeader">{abonnement.nom}</Typography>
                                    <Typography variant="h3" color="black" className="price">{abonnement.tarif} Ar</Typography><br />
                                    <Typography variant="body1" color="grey" className="details">Description</Typography>
                                   <div className="subscribe-btn"> <Button variant="contained" onClick={()=> {console.log("clix"); subscribe(abonnement.id)}} >Se souscrire</Button></div>
                            
                                </CardContent>
                            </Card>
                      
                        </Grid>
                  )                
                }
 
                { alert===false && <AlertError message="Erreur - Vous avez déjà un abonnement valable"/>}
                { alert===true && <AlertSuccess message="Succès - Votre abonnement a été effectué avec succès" />}
            
            </Grid>
        </div>
    );
   
}

