import { useSelect } from "@mui/base";
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { useSelector } from "react-redux";

export const panierSlice = createSlice({
  name: "panier",
  initialState: [],
  reducers: {
    setPanier: (state, action) => {
      console.log("set")
      state = action.payload;
      state.forEach(element => {
        console.log("pstate:"+element.prix)
      });
      return state
    },
    addToPanier: (state, action) =>{
      let indexFind = state.findIndex(i => i.id_medicament === action.payload.id_medicament)
      if(indexFind < 0){
        state.push(action.payload)
      }else{
        let item = state.find(i => i.id === indexFind+1)
        item.quantite += 1
      }
    },
    changeItemValue: (state, action) => {
      let item = state.find(p => p.id === action.payload.id)
      item.quantite = action.payload.value    
    },
    deleteItem: (state, action) => {
      state = state.filter(p => p.id !== action.payload)
      return state
    },
    setPriceItems: (state, action) => {
      var id_prestataire = action.payload.id_prestataire
      state.forEach( async(item) => {
        const {data} = await axios.post('https://irc-o1g5.onrender.com/medicament/getPrice',
        {
          id_medicament: item.id_medicament,
          id_prestataire
        })
        // state = state.find(s=> s.id === item.id)
        item.prix = data[0].prix
        console.log("item.prix:"+item.prix)
      });
      return state
    }
  }
});

export const setAllPrice = (id_prestataire) =>  async(dispatch) => {
  try {
      dispatch(setPriceItems(id_prestataire))
  } catch (err) {
    throw new Error(err);
  }
};




//Action
export const { setPanier,addToPanier,changeItemValue,deleteItem,setPriceItems } = panierSlice.actions;

//State
export const showPanier = (state) => state.panier;


//Reducer
export default panierSlice.reducer;
