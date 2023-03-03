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
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import GroupIcon from '@mui/icons-material/Group';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import useShoppingCart from '../../../helpers/useShoppingCart';



import {
          inputs,
          useInputs
        } from '../../../helpers/useInputs';



const Login=()=>{
  const shoppingCart  =   useShoppingCart()
  let navigate        =   useNavigate();
  const context       =   React.useContext(StateContext);
  const [input,setInput]        = React.useState({data:false});

  React.useEffect(()=>{
    shoppingCart.get().then((response)=>{
      setInput({data:JSON.stringify(response)})
    })
  },[shoppingCart])

  const handleSubmit=(e)=>{
    e.preventDefault()
    //return console.log(inputs);
    context.post(false,{...inputs,...input},false,true).then((response)=>{
      if (response.data && response.data.token) {
        navigate("/auth/login/"+response.data.token)
      }
    })
  }


  return <>
          <Typography component="h1" variant="h5">
            {"Registro de usuario"}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">{"Nombres y Apellidos"}</InputLabel>
              <OutlinedInput
                  id="name"
                  name="name"
                  required
                  type="text"
                  autoFocus
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><PersonIcon/></InputAdornment>}
                  label={"Nombres y Apellidos"}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">{"Correo electrónico"}</InputLabel>
              <OutlinedInput
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                  label={"Correo electrónico"}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">{"Celular"}</InputLabel>
              <OutlinedInput
                  id="celular"
                  name="celular"
                  required
                  type="text"
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><SmartphoneIcon/></InputAdornment>}
                  label={"Celular"}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">{"Contraseña"}</InputLabel>
              <OutlinedInput
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  onChange={useInputs}
                  startAdornment={<InputAdornment position="start"><GroupIcon/></InputAdornment>}
                  label={"Contraseña"}
              />
            </FormControl>

            <Grid container sx={{mt:0}} spacing={1}>
              <Grid item md={12} xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"> {"Registrarme"} </Button>
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
