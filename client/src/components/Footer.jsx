import React from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({

  footerStyles: {
    color: 'white',
    backgroundImage: "linear-gradient(to bottom right, #0399BC, #5A55AA)"

  },
  linkContainer: {
    display: 'flex',
  
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    padding: '3%',
    paddingTop: '3%'
  },
  aStyles: {
    color:'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    },
    lineHeight: '180%'
  },
  bottom: {
    textAlign: 'center',
    padding: '1%'
  }
})

export default function Footer() {

  const classes = useStyles();

  return (
    <footer className={classes.footerStyles}>
      <div className={classes.linkContainer}>
        <div className={classes.links}>
          <h3>Navigation</h3>
          <a href='#' className={classes.aStyles}>Profil</a>
          <a href='#' className={classes.aStyles}>Achat</a>
          <a href='#' className={classes.aStyles}>Abonnement</a>
        </div>
        <div className={classes.links}>
          <h4>Support</h4>
          <a href='#' className={classes.aStyles}>FAQs</a>
          <a href='#' className={classes.aStyles}>Contact</a>
          <a href='#' className={classes.aStyles}></a>
        </div>
        <div className={classes.links}>
          <h4>Nous suivre</h4>
          <a href='#' className={classes.aStyles}>Linkedin</a>
          <a href='#' className={classes.aStyles}>Facebook</a>
        </div>
      </div>
      <h5 className={classes.bottom}>@Copyright 2022, RAMAMONJITIANAHARIJAONA Maminiaina Fabruce</h5>
    </footer>
  );
}
