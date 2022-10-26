import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMedicamentsAsync, addMedicamentAsync, showMedicament } from "../../features/medicamentSlice";

export default function App() {
  const dispatch = useDispatch();
  const medicaments = useSelector(showMedicament)
  
  useEffect(() => {
    dispatch(getMedicamentsAsync('medicament/findAll'))
  }, [])
  
  return (
    <div className="App">
      <h1>Hello REDUX Toolkit</h1>
     
      {medicaments && medicaments.map((item) => 
        <p key={item.id}>{item.nom}</p>
      )}

    </div>
  );
}
