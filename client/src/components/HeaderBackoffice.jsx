import '../assets/css/HeaderBackoffice.css';
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

export default function HeaderBackoffice() {
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get(`http://localhost:5000/logout`)
    navigate('/logout')
  }

  const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
      <div>
        <nav className="navigation">
          <div className='logo'>
              <a href="/" className="brand-name">
              <img src={require('../assets/images/LOGO-IRC-BLANC.png')} alt="" id='logo'  />
            </a> <a
              className="hamburger"
              onClick={() => {
                setIsNavExpanded(!isNavExpanded)
              }}
            ><MenuOutlinedIcon/></a> 
          </div>
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
       
            <ul>
              
              <li>
                <a href="/profilUtilisateur"><AccountCircleOutlinedIcon /> Tableau de bord</a>
              </li>
              <li>
                <a href="/home"><PlaceOutlinedIcon /> Inscription utilisateur</a>
              </li>
              <li>
                <a href="/about">  <HealingOutlinedIcon />Ajout prestataire de soin</a>
              </li>
              <li>
                <a href="#">  <HealingOutlinedIcon />Insertion médicament</a>
              </li>
              <li>
                <a href="#">  <HealingOutlinedIcon />Ajout médicament à un prestataire</a>
              </li>
              <li>
                <a href="/logout" id="deco"><LogoutOutlinedIcon /> Se deconnecter </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
  );
}


