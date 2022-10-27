import { configureStore } from "@reduxjs/toolkit";
import medicamentSlice from "./features/medicamentSlice";

export default configureStore({
  reducer: {
    medicament: medicamentSlice
  }
});
