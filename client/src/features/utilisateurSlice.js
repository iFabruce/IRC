import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const utilisateurSlice = createSlice({
  name: "utilisateur",
  initialState: {
    session: null,
    userId: null,
  },
  reducers: {
    setSession: async(state, action) => {
      state.session = action.payload;
    },
    setUserId: async(state, action) => {
      state.userId = action.payload;
    },

  }
});

// export const getUtilisateursAsync = (url) => async (dispatch) => {
//   try {
//     dispatch(getUtilisateurs(url));
//   } catch (err) {
//     throw new Error(err);
//   }
// };



//Action
export const { getUtilisateurs } = utilisateurSlice.actions;

//State
export const showSession = (state) => state.utilisateur.session;
export const showUserId = (state) => state.utilisateur.userId;

//Reducer
export default utilisateurSlice.reducer;
