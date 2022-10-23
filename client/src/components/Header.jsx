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

import { Navigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get(`http://localhost:5000/logout`)
    navigate('/logout')
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
              <a href="/logout" id="deco"><LogoutOutlinedIcon /> Se deconnecter </a>
            </li>
          </ul>
        </div>
      </nav>
       
  );
}

export default Header;
