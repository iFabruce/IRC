import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Map from './views/frontoffice/Map';
import Login from './views/frontoffice/Login';
import Abonnement from './views/frontoffice/Abonnement';
import ProfilUtilisateur from './views/frontoffice/ProfilUtilisateur';

import Bouton from './components/ButtonCustomize';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import Dashboard from './views/backoffice/Dashboard';
import HeaderBackoffice from './components/HeaderBackoffice';
import InsertionUtilisateur from './views/backoffice/InsertionUtilisateur';
import InsertionMedicament from './views/backoffice/InsertionMedicament';
import InsertionPrestataire from './views/backoffice/InsertionPrestataire';
import ChoixMedicament from './views/frontoffice/ChoixMedicament';
import ChoixPrestataire from './views/frontoffice/ChoixPrestataire';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      {/* <Route exact path="/" element={<Login />}></Route> */}
      {/* <Route exact path="/" element={<><Header/><ChoixMedicament /></>}></Route> */}
      <Route exact path="/" element={<ChoixMedicament />}></Route>
      <Route exact path="/choixPrestataire" element={<ChoixPrestataire />}></Route>


      <Route exact path="/insertionUtilisateur" element={<InsertionUtilisateur />}></Route>
      <Route exact path="/insertionMedicament" element={<InsertionMedicament />}></Route>
      <Route exact path="/insertionPrestataire" element={<InsertionPrestataire />}></Route>

      {/* <Route exact path="/" element={<Login />}></Route> */}
      <Route path="abonnement" element={<><Header/><Abonnement/></>} />
      <Route path="logout" element={<><Login/></>} />
      <Route path="profilUtilisateur" element={<><Header/><ProfilUtilisateur/></>} />


    </Routes>
  </BrowserRouter>
   


  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
