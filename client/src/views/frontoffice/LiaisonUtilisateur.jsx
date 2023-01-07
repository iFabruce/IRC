import {useState, useEffect} from 'react'
import { Grid, Paper, TextField, FormControl,MenuItem, Select, InputLabel } from '@mui/material';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {showUserId,showSession} from '../../features/utilisateurSlice'
import {useSelector} from 'react-redux'
import axios from 'axios';


export default function LiaisonUtilisateur() {
    const navigate = useNavigate();
    const userId = useSelector(showUserId) 
    const session = useSelector(showSession) 
    const [users, setUsers] = useState([])

    useEffect( () => {
        if(session === null) navigate('/')
        const fetchData = async () => {
          const {data} = await axios.get(`https://irc-backend.vercel.app/utilisateur/getLinkedUsers/${userId}`)
          setUsers(data)
        }
        fetchData()
      }, [])
  return (
    <div>
        <Grid container spacing={0}>
          <Grid item xs={12} md={12}>
          <TableContainer component={Paper} sx={{margin:'2%'}}>
              <Table sx={{ minWidth: 100 }} >
                <TableHead>
                  <TableRow >
                    <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Prénom</TableCell>
                    <TableCell style={{fontWeight: 'bold'}}>Téléphone</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                {users && users.map((row) => (
                  <TableRow
                    key={row.id_achat}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.nom}</TableCell>
                    <TableCell  component="th" scope="row">{row.prenom}</TableCell>
                    <TableCell  component="th" scope="row"> {row.telephone} </TableCell>

                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      
    </div>
  )
}
