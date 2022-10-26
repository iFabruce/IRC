import { configureStore } from "@reduxjs/toolkit";
import medicamentSlide from "./features/medicamentSlice";

export default configureStore({
  reducer: {
    medicament: medicamentSlide
  }
});
