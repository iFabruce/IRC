import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
// import Map from './views/frontoffice/Map';
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<><HeaderBackoffice /><Dashboard /></>}></Route>

      {/* <Route exact path="/" element={<Login />}></Route> */}
      <Route path="abonnement" element={<><Header/><Abonnement/></>} />
      <Route path="logout" element={<><Login/></>} />
      <Route path="profilUtilisateur" element={<><Header/><ProfilUtilisateur/></>} />


    </Routes>
  </BrowserRouter>
   {/* */}
    {/* <Header/> */}
    {/* <Abonnement/> */}
  
    {/* <Header/>
    <ProfilUtilisateur/> */}


  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
