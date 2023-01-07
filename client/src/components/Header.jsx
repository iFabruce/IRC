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
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SellIcon from '@mui/icons-material/Sell';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logout = async () => {
    await axios.get(`https://irc-o1g5.onrender.com/logout`)
    dispatch(setSession(null))
    dispatch(setPanier([]))
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
              <a href="/profilUtilisateur"><AccountCircleOutlinedIcon /> Profil</a>
            </li>
            <li>
              <a href="/choixMedicament"><LocalGroceryStoreIcon /> Achat</a>
            </li>
            <li>
              <a href="/abonnement"><CreditCardIcon /> <span> Abonnement</span> </a>
            </li>
            <li>
              <a href="/validationCodebit">  <PaidIcon /> Co-débit</a>
            </li>
            <li>
              <a href="#" onClick={logout} id="deco"><LogoutOutlinedIcon /></a>
            </li>
          </ul>
        </div>
      </nav>
       
  );
}

export default Header;
