import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit"
import medicamentSlice from "./features/medicamentSlice"
import utilisateurSlice from "./features/utilisateurSlice"


export default configureStore({
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    utilisateur: utilisateurSlice,
    medicament: medicamentSlice
  }
});
