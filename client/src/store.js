import { configureStore,getDefaultMiddleware, combineReducers } from "@reduxjs/toolkit"
import medicamentSlice from "./features/medicamentSlice"
import utilisateurSlice from "./features/utilisateurSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({ 
  utilisateur: utilisateurSlice,
  medicament: medicamentSlice
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
