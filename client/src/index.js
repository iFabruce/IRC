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
import HeaderBackoffice from './components/HeaderBackoffice';
import Statistique from './views/backoffice/Statistique';
import InsertionUtilisateur from './views/backoffice/InsertionUtilisateur';
import InsertionMedicament from './views/backoffice/InsertionMedicament';
import InsertionPrestataire from './views/backoffice/InsertionPrestataire';
import ListePrestataire from './views/backoffice/ListePrestataire';
import ListeMedicament from './views/backoffice/ListeMedicament';
import ListeUtilisateur from './views/backoffice/ListeUtilisateur';
import MedicamentPrestataire from './views/backoffice/MedicamentPrestataire';
import Paiement from './views/frontoffice/Paiement';
import ChoixMedicament from './views/frontoffice/ChoixMedicament';
import ChoixPrestataire from './views/frontoffice/ChoixPrestataire';
import Accueil from './views/frontoffice/Accueil';
import App from './views/frontoffice/App';
import ValidationCoDebit from './views/frontoffice/ValidationCoDebit';

import { Provider } from "react-redux";
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/accueil" element={<Accueil />}></Route>

            <Route exact path="/stat" element={<Statistique />}></Route>

            <Route exact path="/validationCoDebit" element={<><Header/><ValidationCoDebit/></>}></Route>

            {/* <Route exact path="/" element={<Accueil/>}></Route> */}
            <Route exact path="/statistique" element={<Statistique />}></Route>

            <Route exact path="/medicamentPrestataire" element={<MedicamentPrestataire />}></Route>

            <Route exact path="/paiement" element={<><Header/><Paiement/></>}></Route>

            <Route exact path="/choixMedicament" element={<ChoixMedicament />}></Route>
            <Route exact path="/choixPrestataire" element={<ChoixPrestataire />}></Route>

            <Route exact path="/insertionUtilisateur" element={<InsertionUtilisateur />}></Route>
            <Route exact path="/insertionMedicament" element={<InsertionMedicament />}></Route>
            <Route exact path="/insertionPrestataire" element={<InsertionPrestataire />}></Route>

            <Route exact path="/listePrestataire" element={<ListePrestataire />}></Route>
            <Route exact path="/listeMedicament" element={<ListeMedicament />}></Route>
            <Route exact path="/listeUtilisateur" element={<ListeUtilisateur />}></Route>

            <Route path="abonnement" element={<><Header/><Abonnement/></>} />
            <Route path="logout" element={<><Login/></>} />
            <Route path="profilUtilisateur" element={<><Header/><ProfilUtilisateur/></>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
