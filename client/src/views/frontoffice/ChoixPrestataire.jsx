import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import '../../assets/css/Map.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {showUserId, showSession, setTotalPanier} from '../../features/utilisateurSlice'
import {showPanier,setPanier} from '../../features/panierSlice'


export default function ChoixPrestataire() {
    const userId = useSelector(showUserId)
    const session = useSelector(showSession)
    
    const dispatch = useDispatch()
    const panier = useSelector(showPanier)
    const navigate = useNavigate()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [prestataires, setPrestataires] = useState([])
    
    const getPriceMedicament = async(id_medicament, id_prestataire) => {
        try {
            const {data} = await axios.post('http://localhost:5000/medicament/getPrice',{id_medicament,id_prestataire})
        } catch (error) {
            console.log(error)
        }
      } 
    const versPaiement = async(id_prestataire) => {
        localStorage.setItem('id_prestataire', id_prestataire)
        var total = 0
        var tab = JSON.parse(JSON.stringify(panier))
        console.log(tab);
        var promises = tab.map((element)=> axios.post('http://localhost:5000/medicament/getPrice',{id_medicament: element.id_medicament, id_prestataire})); 
        // tab.forEach(async(element) => {
        //     const data = await axios.post('http://localhost:5000/medicament/getPrice',{id_medicament: element.id_medicament, id_prestataire})
        //    promises.push(data);
        // });
        console.log("tqb lengt",tab.length)
        console.log("length",promises.length)
        Promise.all(promises).then((result)=>{
            console.log('data',result);
            result.forEach((element,i) => {
                tab[i].prix = element.data
                console.log("prix:"+tab[i].prix)
                total +=  tab[i].prix * tab[i].quantite
            })
            // tab[i].prix =  result.data

            // console.log("total:"+total);
            dispatch(setTotalPanier(total))
            dispatch(setPanier(tab))
            // tab.forEach(i => console.log("temp:"+i.prix))
            navigate('/paiement')
        })
        //
        // console.log("total:"+total)
        // console.log(total)
    }
    useEffect(() => {
        if(session === null) navigate('/')
        console.log("userID:"+userId)

        const getAvailablePrestataire = async() =>{
            try {
                const {data} = await axios.post(`http://localhost:5000/prestataire/getAllAvailable`,panier)
                console.log(data)
                setPrestataires(data)
            } catch (error) {

            }
        }
        const getLocation = async () => {
            setLat(0)
            setLong(0)

            try{
                navigator.geolocation.getCurrentPosition((position) => {
                    // setLat(position.coords.latitude);
                    localStorage.setItem('latitude', position.coords.latitude)
                    localStorage.setItem('longitude', position.coords.longitude)
        
                    // setLong(position.coords.longitude);
                });     
                console.log("LONG:"+localStorage.getItem('longitude'))
                console.log("LAT:"+localStorage.getItem('latitude'))
                setLat(localStorage.getItem('latitude'))
                console.log("lat:"+lat);
                setLong(localStorage.getItem('longitude'))
            }
            catch{

            }
            
        }
        getAvailablePrestataire()
        getLocation()
    }, [])

    const choixPrestataire = async (ps) => {
        // localStorage.setItem('prestataireChoisi',JSON.stringify(ps))
        navigate('/paiement')
    }
    return (
        <div>
            
            <MapContainer center={[localStorage.getItem('latitude'), localStorage.getItem('longitude')]} zoom={18} scrollWheelZoom={true} id="map">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {prestataires && prestataires.map(px => 
                    <div key={px.id}>
                        <Marker position={[px.latitude, px.longitude]}>
                            <Popup>
                                <h4 style={{letterSpacing:'.2vw'}}>{px.nom}</h4>
                                <p>Adresse: <strong>{px.adresse}</strong></p>
                                <p>Ouverture: <strong style={{color:'green'}}>{px.ouverture}</strong></p>
                                <p>Fermeture: <strong style={{color:'red'}}>{px.fermeture}</strong></p>
                                    <a href="/paiement">Choisir</a>  
                            </Popup>
                        </Marker>
                    </div>
                )
                }
                <Marker position={[localStorage.getItem('latitude'), localStorage.getItem('longitude')]} style={{color: 'blue', background: 'red' , borderRadius: '50px'}}>
                    
                </Marker>
            </MapContainer> 


        
        
        {/* <h1>userID: {userId}</h1>
        {prestataires && prestataires.map(px => 
            <ul key={px.id}>
                <li>
                    <h1>{px.nom}</h1>
                    <a href="#" onClick={ () => versPaiement(px.id)}>Choisir</a>
                </li>
            </ul>
        )} */}

        </div>
    )
}
