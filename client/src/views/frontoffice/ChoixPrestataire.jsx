import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import '../../assets/css/Map.css'

export default function ChoixPrestataire() {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });            
    }
    useEffect(() => {
        const getAvailablePrestataire = async() =>{
            const medicaments = JSON.parse(localStorage.getItem('panier'))
            const {data} = await axios.post(`http://localhost:5000/prestataire/getAllAvailable`,medicaments)
            console.log(data)
        }
        
        getAvailablePrestataire()
        getLocation()

    }, [])
  

    return (
        <div>
            <MapContainer center={[0,0]} zoom={13} scrollWheelZoom={false} id="map">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={location}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker> */}
        </MapContainer>
        </div>
    )
}
