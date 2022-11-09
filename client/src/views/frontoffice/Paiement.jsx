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
import {showUserId, showSession} from '../../features/utilisateurSlice'
import {showPanier, setPanier} from '../../features/panierSlice'
import { useNavigate } from 'react-router-dom';


export default function Paiement(){
    const navigate = useNavigate();

    const session = useSelector(showSession)
    const userId = useSelector(showUserId)
    const panier = useSelector(showPanier)

    const [prix, setPrix] = useState(0)
    const [nombreMois, setNombreMois] = useState(1)
    const [montant, setMontant] = useState()
    const [echeances, setEcheances] = useState()
   
    const [userInfo, setUserInfo] = useState()
    const [openDialogMessage, setOpenDialogMessage] = useState(false)
    const [openDialogForm, setOpenDialogForm] = useState(false)

    const [numeroCodebiteur, setNumeroCodebiteur] = useState()

    const [alert, setAlert] = useState('')
    const [codebitAlert, setCodebitAlert] = useState('a')


    const export_pdf = async() => {
        localStorage.setItem('id_panier',Number(localStorage.getItem('id_panier')) + 1 )
        const {data} = await axios.post('http://localhost:5000/achat/export_pdf',
        {
            panier,
            id: localStorage.getItem('id_panier')
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
                montant
            })
        setCodebitAlert(data)
    }
    const cashout =  async(amount) => {
        console.log("USERA:"+userId)
        const {data} = await axios.post('http://localhost:5000/achat/debit',
        {
            panier,
            id_utilisateur: userId, 
            amount
        })
        console.log("data:"+data)
        if(!data){
            setOpenDialogMessage(true)
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
        if(session === null) navigate('/')

        const loadData =  () => {
            let somme = 0
            try {
                var temp = [...panier]
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
                    <div id="btn"><Button  variant="contained" className="buttonPaiement" onClick = { () => {cashout(montant)}} > Confirmer votre paiement </Button></div> <br />
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
