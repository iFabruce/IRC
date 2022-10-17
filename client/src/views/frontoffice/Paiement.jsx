import {useEffect, useState} from 'react'
import { Grid, Paper, TextField, FormControl,MenuItem, Select, InputLabel,TextareaAutosize,Button } from '@mui/material';
import '../../assets/css/Paiement.css'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import axios from 'axios'
import { SettingsRemoteSharp } from '@material-ui/icons';
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlertDialog from '../../components/AlertDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Paiement(){
    const [prix, setPrix] = useState(0)
    const [nombreMois, setNombreMois] = useState(1)
    const [montant, setMontant] = useState()
    const [panier, setPanier] = useState()
    const [echeances, setEcheances] = useState()
    const [alert, setAlert] = useState('')
    const [userInfo, setUserInfo] = useState()
    const [open, setOpen] = useState(false)

   
    
    const handleClose = () => {
    setOpen(false);
    };

    const cashout =  async(amount) => {
        console.log("USERA:"+localStorage.getItem('id_utilisateur'))
        const {data} = await axios.post('http://localhost:5000/achat/debit',{panier: JSON.parse(localStorage.getItem('card')),id_utilisateur: localStorage.getItem('id_utilisateur'), amount})
        console.log("data:"+data)
        if(!data){
            setOpen(true)
        }
        setAlert(data)
    }

    const showTotal =  () => {
        let somme = 0

        panier.forEach(px => {
            somme += px.prix * px.quantite 
            console.log("Produit:"+px.nom + " Montant :"+px.prix * px.quantite)
        });
        
        setMontant(somme)
    }
    const extendEcheance = (value) => {
        if(montant > 1){
            let tab = []
            for(let i=1 ; i <= value;i++){
                tab.push({mois: i, montant: Math.floor(montant/value)})
            }
            setEcheances(tab)
        }
    }
    const getPriceMedicament = async(id_medicament) => {
        try {
            const {data} = await axios.post('http://localhost:5000/medicament/getPrice',
              {
                id_medicament: id_medicament,
                id_prestataire: localStorage.getItem('id_prestataire')
              })
              return data[0].prix
            //   console.log("PRICE:"+data[0].prix)
            //   setPrix(data[0].prix)
        } catch (error) {
            console.log(error)
        }
    }  
    useEffect(() => {
        const loadData =  () => {
            let somme = 0
            try {
               
                const temp = [...JSON.parse(localStorage.getItem('card'))]
                console.log("temp:"+temp)
                // console.log("prix:"+prix)
                
                // setPanier(temp)
                temp.forEach(async(element) => {
                    element.prix = await getPriceMedicament(element.id_medicament)
                    console.log(element);
                });
                setPanier(temp)
                // console.log("PX:"+panier)
                // console.log("LL:"+panier.length)
                setMontant(somme)
            } catch (error) {
                console.log(error)
            }
        }
        loadData()
        
    }, [])
    
    return (
    <div>
        <Grid container spacing={10} id="content">
            <Grid item xs={12} md={6} id="leftPaiement">
                <div >
                <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 50 }} >
                            <TableHead>
                            <TableRow >
                                <TableCell style={{fontWeight: 'bold'}}>Médicament</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Quantité</TableCell>
                              
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {panier && panier.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell component="th" scope="row">{row.nom}</TableCell>
                                <TableCell component="th" scope="row">{row.quantite}</TableCell>
                            </TableRow>
                        ))}
                            </TableBody>
                            
                        </Table>
                    </TableContainer>
                </div> 
                <br/>
               


            </Grid>
            <Grid item xs={12} md={6}>
               <div id="rightPaiement">
               <Accordion onClick={showTotal}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <p>Voir plus</p>
                    </AccordionSummary>
                    <AccordionDetails>
                    <h1>Details paiement</h1> <br /> <br />
                    <p>Total à payer:</p><br />
                    <p id="totalPaiement">{montant} Ar <span class="lightText">/ mois</span> </p> 
                    <div id="btn"><Button  variant="contained" className="buttonPaiement" onClick = { () => {cashout(montant)}} > Confirmer votre paiement </Button></div> <br /> <br />
                    { alert===false &&  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Procédez à une co-débitation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Votre solde est actuellement insuffisant pour effectuer ce paiement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Co-débiter
          </Button>
        </DialogActions>
      </Dialog>}
                { alert===true && <AlertSuccess message="Transaction réussi." />}
            <br />
                    <p>Echéance (en mois)</p><br />
                    <TextField
                      id=""
                      label=""
                        type="number"
                        onChange= { e=> { extendEcheance(e.target.value)}}
                    /> <br /> 
                     <br />
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 100 }} >
                            <TableHead>
                            <TableRow >
                                <TableCell style={{fontWeight: 'bold'}}>Mois</TableCell>
                                <TableCell style={{fontWeight: 'bold'}}>Montant</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {echeances && echeances.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.mois}</TableCell>
                                <TableCell  component="th" scope="row" style={{ fontWeight:'bold'}}>{row.montant} Ar</TableCell>
                            </TableRow>
                        ))}
                            </TableBody>
                            
                        </Table>
                    </TableContainer>
                
                    </AccordionDetails>
                </Accordion>

               </div>
            </Grid>
        </Grid>
    </div>
  )
}
