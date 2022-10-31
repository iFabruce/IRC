import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import '../../assets/css/Map.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import {showUserId, showSession} from '../../features/utilisateurSlice'

export default function ChoixPrestataire() {
    const userId = useSelector(showUserId)
    const navigate = useNavigate()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [prestataires, setPrestataires] = useState([])

    const versPaiement = (id_prestataire) => {
        localStorage.setItem('id_prestataire', id_prestataire)
        navigate('/paiement')
    }
    useEffect(() => {
      console.log("userID:"+userId)

        const getAvailablePrestataire = async() =>{
            try {
                const medicaments = JSON.parse(localStorage.getItem('card'))
                console.log("MEDICAMENTS:"+medicaments)
                const {data} = await axios.post(`http://localhost:5000/prestataire/getAllAvailable`,medicaments)
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
            {/* <MapContainer center={[localStorage.getItem('latitude'), localStorage.getItem('longitude')]} zoom={18} scrollWheelZoom={true} id="map">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {prestataires && prestataires.map(px => 
                <div key={px.id}>
                    <Marker position={[px.latitude, px.longitude]}>
                        <Popup>
                             <a href="/paiement">Choisir</a>  
                        </Popup>
                    </Marker>
                </div>
            )
            }
        </MapContainer>  */}
        <h1>userID: {userId}</h1>
        {prestataires && prestataires.map(px => 
            <ul key={px.id}>
                <li>
                    <h1>{px.nom}</h1>
                    <a href="#" onClick={ () => versPaiement(px.id)}>Choisir</a>
                </li>
            </ul>
        )}

        </div>
    )
}
