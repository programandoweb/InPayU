import React from 'react';
//import { useState } from 'react';
import StateContext from '../../../helpers/ContextState';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupIcon from '@mui/icons-material/Group';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
          inputs,
          useInputs
        } from '../../../helpers/useInputs';

const Login=()=>{
  let navigate  = useNavigate();
  const context = React.useContext(StateContext);

  const handleSubmit=(e)=>{
    e.preventDefault()
    context.post(false,inputs,false,true).then((response)=>{
      if (response.data && response.data.token) {
        //navigate("/auth/register/continue/"+response.data.token)
        navigate("/auth/login/"+response.data.token)
      }
    })
  }

  return <>
          <Typography component="h1" variant="h5">
            Registro de usuario
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Nombres y Apellidos</InputLabel>
              <OutlinedInput
                  id="nombre"
                  name="nombre"
                  required
                  type="text"
                  autoFocus
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><PersonIcon/></InputAdornment>}
                  label="Nombres y Apellidos"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Correo electrónico</InputLabel>
              <OutlinedInput
                  id="email"
                  name="email"
                  autoComplete="email"

                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                  label="Correo electrónico"
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Contraseña</InputLabel>
              <OutlinedInput
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><GroupIcon/></InputAdornment>}
                  label="Contraseña"
              />
            </FormControl>

            <FormControl>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Checkbox  />} label="Al registrarme, acepto los Términos, Condiciones y Políticas de Click Conexion." className="t-12" />
                <FormControlLabel value="male" control={<Checkbox  />} label="Autorizo que Click Conexion use los datos proporcionados para conectarme y recibir promociones, ofertas e información de nuevos productos." className="t-12" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="outlined" 
              sx={{ mt: 3, mb: 2 }}> Ya tengo cuenta </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/auth/login" variant="body2">
                  <Typography className="t-12">
                    Iniciar sesión
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </>
}

export default Login
