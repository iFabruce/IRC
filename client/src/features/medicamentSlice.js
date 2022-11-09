import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");

export const medicamentSlice = createSlice({
  name: "medicament",
  initialState: {
    data: []
  },
  reducers: {
    getMedicaments: async(state, action) => {
      const {data} = await axios.get(`http://localhost:5000/${action.payload}`);
      console.log(data)
      state.data = [...data];
    }
  }
});

export const getMedicamentsAsync = (url) => async (dispatch) => {
  try {
    dispatch(getMedicaments(url));
  } catch (err) {
    throw new Error(err);
  }
};





export const { getMedicaments } = medicamentSlice.actions;
export const showMedicament = (state) => state.medicament.data;
export default medicamentSlice.reducer;
