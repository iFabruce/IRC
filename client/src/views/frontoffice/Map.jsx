import {useEffect,useState} from 'react';
import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import '../../assets/css/Map.css';
import axios from 'axios'

function Map() {
    const [prestataires, setPrestataires] = useState([])
    useEffect(() => {
        const loadData  = async () => {
            
        }
        loadData()
    }, [])
    const position = [51.505, -0.09]
    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map">
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
        </div>
    );
    
}

export default Map;