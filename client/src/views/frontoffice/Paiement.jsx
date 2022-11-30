import {useEffect, useState} from 'react'
import { Grid, Paper, TextField, FormControl,MenuItem, Select, InputLabel,TextareaAutosize,Button } from '@mui/material';
import '../../assets/css/Paiement.css'
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@mui/material';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material'
import axios from 'axios'
import { SettingsRemoteSharp } from '@material-ui/icons';
import AlertSuccess from '../../components/AlertSuccess';
import FormDialog from '../../components/FormDialog';

import AlertError from '../../components/AlertError'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlertDialog from '../../components/AlertDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch} from 'react-redux';
import {showUserId, showSession, showTotalPanier} from '../../features/utilisateurSlice'
import {showPanier} from '../../features/panierSlice'
import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function Paiement(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const session = useSelector(showSession)
    const userId = useSelector(showUserId)
    const panier = useSelector(showPanier)
    const totalPanier = useSelector(showTotalPanier)

    const [prix, setPrix] = useState(0)
    const [nombreMois, setNombreMois] = useState(1)
    // const [montant, setMontant] = useState()
    const [echeances, setEcheances] = useState()
    const [mois_echeance, setMois_Echeance] = useState(1)

   
    const [userInfo, setUserInfo] = useState()
    const [openDialogMessage, setOpenDialogMessage] = useState(false)
    const [openDialogForm, setOpenDialogForm] = useState(false)

    const [numeroCodebiteur, setNumeroCodebiteur] = useState()

    const [alert, setAlert] = useState('')
    const [codebitAlert, setCodebitAlert] = useState('a')
    
    // panier.forEach(element => console.log("prix:"+element.prix))
    
    useEffect(() => {
        if(session === null) navigate('/')
        panier.forEach(i => console.log("prix:"+i.prix))
    }, [])


    const export_pdf = async() => {
        localStorage.setItem('id_panier',Number(localStorage.getItem('id_panier')) + 1 )
        await axios.post('http://localhost:5000/achat/export_pdf',
        {
            panier,
            num_facture: localStorage.getItem('id_panier'),
            id_utilisateur: userId,
            totalPanier,
            id_prestataire: localStorage.getItem('id_prestataire')
        })
    }

    const handleCloseDialogForm = () => {
        setOpenDialogForm(false);
    };
    
    const handleClose = () => {
        setOpenDialogMessage(false);
    };

    const codebiter =  async(amount) => {
        console.log("USERA:"+userId)
        const {data} = await axios.post('http://localhost:5000/achat/demande_codebit',
            {
                id_demandeur: userId,
                telephone_validateur: numeroCodebiteur,
                panier,
                montant: totalPanier,
                echeance: mois_echeance
            })
        setCodebitAlert(data)
    }
    const cashout =  async(amount) => {
       
        console.log("USERA:"+userId)
        const {data} = await axios.post('http://localhost:5000/achat/debit',
        {
            panier,
            id_utilisateur: userId, 
            amount,
            echeance: mois_echeance
        })
        console.log("data:"+data)
        if(!data){
            setOpenDialogMessage(true)
        }
        setAlert(data)
    }

    const onConfirm = () =>{
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui' >
                  <h1>Confirmer votre paiement.</h1>
                  <p>Etes-vous sûr de vouloir procéder au paiement?</p>
                  <Button disableElevation variant="contained"  
                    onClick={() => {
                      cashout(totalPanier);
                      onClose();
                    }}
                  >
                    Oui
                  </Button> 
                  
                  <Button disableElevation variant="outlined" onClick={onClose}>Non</Button> 
                </div>
              );
            }
          });
    }

    const extendEcheance = (value) => {
        setMois_Echeance(value)
        if(totalPanier > 1){
            let tab = []
            for(let i=1 ; i <= value;i++){
                tab.push({mois: i, montant: Math.ceil(totalPanier/value)})
            }
            setEcheances(tab)
        }
    }

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
               <Accordion>
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
                    <p id="totalPaiement">{totalPanier} Ar <span className="lightText">/ mois</span> </p> 
                    <div id="btn"><Button  variant="contained" className="buttonPaiement" onClick = {onConfirm} > Confirmer votre paiement </Button></div> <br />
                    <a href="#" onClick={export_pdf}>Recevoir une facture</a> <br />
                    
                   
                   { alert===false &&  <Dialog
                        open={openDialogMessage}
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
                            Veuillez entrer le numero de téléphone d'un utilisateur pour demander un co-débit.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={ (e) => { setNumeroCodebiteur(e.target.value) } }
                        />
                        { codebitAlert===true && <AlertSuccess message="Demande de co-debit envoyée." /> }
                        { codebitAlert===null && <AlertError message="Cet utilisateur n'existe pas ou est lié à votre portefeuille." /> }


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={codebiter} >
                                Demander un co-debit
                            </Button>
                            <Button onClick={handleClose} autoFocus>
                                Fermer
                            </Button>
                        </DialogActions>
                    </Dialog>
                    }
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
