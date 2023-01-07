import {useState, useEffect} from 'react';
import axios from 'axios';
import HeaderBackoffice from '../../components/HeaderBackoffice'
import '../../assets/css/Statistique.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import {Button, MenuItem, Select} from '@mui/material'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


export default function Statistique() {
  const [data, setData] = useState({labels: [], datasets: []})
  const [type, setType] = useState("nom_medicament") 
  const [order, setOrder] = useState("asc") 
  const [limit, setLimit] = useState(10)
  const [counter, setCounter] =  useState([])





  
  const loadData = async() =>{
    var labels = []
    var datasets = []
    const {data} = await axios.post('https://irc-backend.vercel.app/medicament/stat', {type, order, limit})

    var datasetsItem = {} 
    datasetsItem.label = "Quantité"
    datasetsItem.backgroundColor = '#0399BC'
    var tabs = []
    data.map( item => {
      labels.push(item.nom_medicament)
      tabs.push(item.quantite)
    })
    datasetsItem.data = tabs
    datasets.push(datasetsItem)
    setData({labels: labels,datasets: datasets})
  }
  useEffect(() => {
    var tab = []
    for(var i=1;i<=10;i++){
      tab.push(i)
    }
    setCounter([...tab])
    loadData()

  }, [])
  
 
  

  return( 
      // console.log(data.labels)
      <div>
        <Grid container id="cont" spacing={10}>
            <Grid item sx={12} md={3}>
           <div className="navLeft">
                    <HeaderBackoffice/>
                </div>
            </Grid>
            <Grid item sx={12} md={9} className="contentRight" style={{marginTop: '50px'}} >
                <Grid container spacing={1}>
                    <Grid item md={2}>
                      <InputLabel>Filtrer par</InputLabel>
                          <Select
                            id="standard-select"
                            value={type}
                            label="Filtrer par"
                            onChange={e => {setType(e.target.value)}}
                            >
                            <MenuItem value={'nom_medicament'}>nom</MenuItem>
                            <MenuItem value={'quantite'}>quantite</MenuItem>

                            </Select>
                    </Grid>
                    <Grid item md={2}>
                    <InputLabel>Ordre</InputLabel>
                      <Select
                          id="standard-select"
                          value={order}
                          label="Ordre"
                          onChange={e => {setOrder(e.target.value)}}
                          >
                          <MenuItem value={'asc'}>ascendant</MenuItem>
                          <MenuItem value={'desc'}>descendant</MenuItem>

                        </Select>
                    </Grid>
                    <Grid item md={2}>
                    <InputLabel>Limite</InputLabel>
                    <Select
                            id="standard-select"
                            value={limit}
                            label="Limite"
                            onChange={e => {setLimit(e.target.value)}}
                            >
                            
                          {counter.map(i =>
                            <MenuItem key={i}
                              value={i} 
                           
                            >{i}</MenuItem>
                          )}
                            </Select>
                    </Grid>
                    <Grid item md={2}>
                      <div className='btn'>
                       <Button variant="contained" onClick= {loadData} style={{background: 'linear-gradient(to bottom right, #5A55AA, #0399BC)'}}>
                          Filtrer
                        </Button>
                      </div>
                     
                    </Grid>
                </Grid>
                  <div class="input-bar">
                   
                      
                      </div>
                   <Bar options={options} data={data} />
                
            </Grid>
        </Grid>
     </div>
  
  );
}
