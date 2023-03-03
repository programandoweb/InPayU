import React from 'react';
//import { useEffect } from 'react';
import StateContext from '../../helpers/ContextState';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import {
          inputs,
          useInputs
        } from '../../helpers/useInputs';

const Login=()=>{

  const context = React.useContext(StateContext);

  const handleSubmit=(e)=>{
    e.preventDefault()
    context.post("api/login",inputs,false,true).then((response)=>{
      if (response.data && response.data.user) {
        context.socket.emit("registeruser",{  ...response.data.user,
                                              latitude:context.position.latitude,
                                              longitude:context.position.longitude
                                            })
        context.setUser({...response.data.user,access_token:response.data.access_token})
        context.setToken(response.data.access_token)
      }
    })
  }

  return <>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={useInputs}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={useInputs}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined" 
              sx={{ mt: 3, mb: 2 }}> Iniciar sesión </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/recover" variant="body2">
                  <Typography>
                    Olvidé contraseña
                  </Typography>
                </NavLink>
              </Grid>
              <Grid item xs>
                <NavLink to="/register" variant="body2">
                  <Typography>
                    Registrarme
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </>
}

export default Login
