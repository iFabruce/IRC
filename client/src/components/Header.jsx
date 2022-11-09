import '../assets/css/Header.css';
import '../assets/css/icons.css';
import { useState } from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {setSession} from '../features/utilisateurSlice'
import {setPanier} from '../features/panierSlice'
import { useSelector, useDispatch} from 'react-redux';


function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get(`http://localhost:5000/logout`)
    dispatch(setSession(null))
    dispatch(setPanier(null))

    navigate('/')
  }

  const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          <img src={require('../assets/images/LOGO-IRC-BLANC.png')} alt="" id='logo'  />
        </a>
        <a
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }}
        ><MenuOutlinedIcon/></a>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              <a href="/profilUtilisateur"><AccountCircleOutlinedIcon /> Mon profil</a>
            </li>
            <li>
              <a href="/choixMedicament "><PlaceOutlinedIcon /> Trouver un prestataire</a>
            </li>
            <li>
              <a href="/about">  <HealingOutlinedIcon />  Mes soins</a>
            </li>
            <li>
              <a href="#" onClick={logout} id="deco"><LogoutOutlinedIcon /> Se deconnecter </a>
            </li>
          </ul>
        </div>
      </nav>
       
  );
}

export default Header;
