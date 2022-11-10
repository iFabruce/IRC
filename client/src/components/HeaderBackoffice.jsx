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
      <div className="content" >
          <div className='logo'>
              <a href="/" className="brand-name">
              <img src={require('../assets/images/LOGO-IRC-BLANC.png')} alt="" id='logo'  />
            </a>
          </div>
        <nav className="navigationa">

       
          <div
            className={
              isNavExpanded ? "navigationa-menu expanded" : "navigationa-menu"
            }
          > <a
                  className="hamburger"
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                  }}
                ><MenuOutlinedIcon/></a> 
         
            <ul>
              
              <li>
                <a href="/profilUtilisateur"><span className='icons'> <AccountCircleOutlinedIcon /></span> Tableau de bord</a>
              </li>
              <li>
                <a href="/insertionUtilisateur"><span className='icons'><PlaceOutlinedIcon /></span> Insertion utilisateur</a>
              </li>
              <li>
                <a href="/insertionPrestataire"> <span className='icons'><HealingOutlinedIcon /></span> Insertion prestataire</a>
              </li>
              <li>
                <a href="/insertionMedicament"> <span className='icons'><HealingOutlinedIcon /></span> Insertion médicament</a>
              </li>
              <li>
                <a href="/medicamentPrestataire"> <span className='icons'><HealingOutlinedIcon /></span> Ajout médicament à un prestataire</a>
              </li>
              <li>
                <a href="/logout" id="deco"><span className='icons'><LogoutOutlinedIcon /></span> Se deconnecter </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
  );
}


