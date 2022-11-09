import { configureStore,getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

//import slice
import utilisateurSlice from "./features/utilisateurSlice"
import medicamentSlice from "./features/medicamentSlice"
import panierSlice from "./features/panierSlice"


const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({ 
  utilisateur: utilisateurSlice,
  medicament: medicamentSlice,
  panier: panierSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: persistedReducer
});

export const persistor = persistStore(store)
