import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
//import StateContext from '../../../helpers/ContextState';

let context   =   false

const Login=()=>{

  //context               =   React.useContext(StateContext);

  const handleSubmit=(e)=>{
    e.preventDefault()
  }

  return <>
          <Typography component="h1" variant="h5">
            {"Recuperar contraseña"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={"Correo electrónico"}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Grid container sx={{mt:0}} spacing={1}>
              <Grid item md={12} xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined">
                  {"Recuperar contraseña"}
                </Button>
              </Grid>
              <Grid item md={12} xs={12}  className="text-center">
                <Button fullWidth component={NavLink} variant="outlined" color="gray" to="/auth/login" >
                  {"Iniciar sesión"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
}

export default Login
