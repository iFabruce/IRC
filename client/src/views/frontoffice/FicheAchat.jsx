import React from 'react'
import Header from '../../components/Header';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import { Grid,Button,Paper,InputLabel,Select,FormControl,MenuItem, TextField } from '@mui/material';
import axios from 'axios'
import { useState, useEffect} from 'react'

const FicheAchat = () => {
    const [detailAchats, setDetailAchats] = useState('')
    const [info_achat, setInfo_achat] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        const getDetailAchat = async() =>{
            const {data} = await axios.get('https://irc-o1g5.onrender.com/achat/getDetail_achat/'+localStorage.getItem('id_achat_detail'))
            setDetailAchats(data)
        }
        const getInfoAchat = async() =>{
            const {data} = await axios.get('https://irc-o1g5.onrender.com/achat/info_achat/'+localStorage.getItem('id_achat_detail'))
            setInfo_achat(data)
        }
        getDetailAchat()
        getInfoAchat()
        if(info_achat.status === 'payé'){
            setColor('green')
        }
        if(info_achat.status === 'en cours de validation'){
            setColor('yellow')
        }
        if(info_achat.status === 'annulé'){
            setColor('rouge')
        }
    }, [color])
  return (
    <div>
        <Header/>
      <div style={{paddingLeft: '8%', paddingTop: '5%'}}>

        <h2 style={{letterSpacing: '.2vw'}}>Fiche achat</h2> <br /><br />
        <p>Date: <strong>{info_achat.date}</strong></p> <br />
        <p>Status: <strong style={{color: color}}>{info_achat.status}</strong></p> <br />

        <p>Echeance: <strong>{info_achat.echeance} mois</strong></p><br />

        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 100 }} >
                <TableHead>
                <TableRow >
                    <TableCell style={{fontWeight: 'bold'}}>Medicament</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Quantité</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {detailAchats && detailAchats.map((row) => (
                <TableRow
                key={row.id_achat}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">{row.nom_medicament}</TableCell>
                <TableCell  component="th" scope="row">{row.quantite}</TableCell>
                
                </TableRow>
            ))}
                </TableBody>
                
            </Table>
        </TableContainer> <br /><br />
        
        <p>Total: <strong>{info_achat.total} Ar</strong></p>

      </div>

    </div>
  )
}

export default FicheAchat
