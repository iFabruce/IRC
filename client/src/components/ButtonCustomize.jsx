import React from 'react'
import Btn from '@mui/material/Button'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    btn: {
        backgroundImage: 'linear-gradient(45deg,#0399BC 30%, #5A55AA 90%)',
        boxShadow: '0 3px 5px 2px rgba(90, 85, 170, .3)',
  
    } ,
    btn2: {
        backgroundImage: 'linear-gradient(45deg,red30%, blue 90%)',
        boxShadow: '0 3px 5px 2px rgba(90, 85, 170, .3)',
  
    }   
})
export default function ButtonCustomize(props) {
  
    const classes = useStyles();
   
    return (
        <div id={props.styling}>
            <Btn variant="contained" className={classes.btn}>{props.text}</Btn>
        </div>
    )
  
}
