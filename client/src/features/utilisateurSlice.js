import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const utilisateurSlice = createSlice({
  name: "utilisateur",
  initialState: {
    session: null,
    userId: null,
    totalPanier: 0
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setTotalPanier: (state, action) => {
      state.totalPanier = action.payload;
    }
  }
});

//Action
export const { setSession, setUserId, setTotalPanier } = utilisateurSlice.actions;

//State
export const showSession = (state) => state.utilisateur.session;
export const showUserId = (state) => state.utilisateur.userId;
export const showTotalPanier = (state) => state.utilisateur.totalPanier;



//Reducer
export default utilisateurSlice.reducer;
