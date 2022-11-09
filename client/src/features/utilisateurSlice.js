import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const utilisateurSlice = createSlice({
  name: "utilisateur",
  initialState: {
    session: null,
    userId: null
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    }
  }
});

// export const setSession = (data) =>  (dispatch) => {
//   try {
//     dispatch(updateSession(data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };
// export const setUserId = (data) =>  (dispatch) => {
//   try {
//     dispatch(updateUserId(data));
//   } catch (err) {
//     throw new Error(err);
//   }
// };



//Action
export const { setSession, setUserId } = utilisateurSlice.actions;

//State
export const showSession = (state) => state.utilisateur.session;
export const showUserId = (state) => state.utilisateur.userId;


//Reducer
export default utilisateurSlice.reducer;
