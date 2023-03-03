import React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupIcon from '@mui/icons-material/Group';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import StateContext from '../../../helpers/ContextState';
import {useStore} from '../../../helpers/useStore';
import useShoppingCart from '../../../helpers/useShoppingCart';
import { useNavigate, useLocation } from "react-router-dom";
import {
          inputs,
          useInputs
        } from '../../../helpers/useInputs';

const socket      =   io( process.env.REACT_APP_SOCKET,{ transports:  ['websocket'], reconnectionDelayMax: 10000,});
let store         =   false
let context       =   false
let shoppingCart  =   false


const Login=()=>{
  store                 =   useStore();
  shoppingCart          =   useShoppingCart()
  context               =   React.useContext(StateContext);

  const { uid }         =   useParams();
  const navigate        =   useNavigate();
  const location        =   useLocation();
  const [dataShoppingCart,setDataShoppingCart]  =   React.useState([])

  useEffect(()=>{
    inputs.email="programacion@ingeeniar.com"
    inputs.password="password"
    shoppingCart.get().then((response)=>{
      setDataShoppingCart(response)
    })
  },[])

  useEffect(()=>{

    if (uid) {
      context.post(false,{token:uid,...dataShoppingCart},false,true).then((response)=>{

        if (response.data && response.data.user) {
          socket.emit("registeruser",{  ...response.data.user,
                                        latitude:context.position.latitude,
                                        longitude:context.position.longitude
                                      })

          const params_ = {...response.data.user,access_token:response.data.access_token,dashboard:response.data.dashboard||"/admin"}
          store.set(params_)
          document.title =  process.env.REACT_APP_NAME + " - hola " +response.data.user.name
          context.setUser({...response.data.user,access_token:response.data.access_token})
          context.setToken(response.data.access_token)

          if (response.data && response.data.shoppingCart) {
            shoppingCart.add(response.data.shoppingCart).then((resp)=>{
              return navigate("/toPay?Login=true");
            })
          }

          if (response.data.dashboard) {
            return navigate("/"+response.data.dashboard+"/main");
          }
          return navigate("/admin");
        }

      })
    }
  },[navigate,uid,dataShoppingCart])

  useEffect(()=>{
    document.title =  process.env.REACT_APP_NAME + " - inicio de sesión"
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()

    context.post(false,{...inputs,shoppingCart:JSON.stringify(dataShoppingCart)},false,false,true).then((response)=>{
      if (response.data && response.data.user) {
        if (context.socket && context.socket.emit) {
          context.socket.emit("registeruser",{  ...response.data.user,
                                                latitude:context.position.latitude,
                                                longitude:context.position.longitude
                                              })
        }


        document.title =  process.env.REACT_APP_NAME + " - hola " +response.data.user.name
        store.set("user",{...response.data.user,access_token:response.data.access_token,dashboard:response.data.dashboard||"/admin"})
        context.setUser({...response.data.user,access_token:response.data.access_token,dashboard:response.data.dashboard||"/admin"})
        context.setToken(response.data.access_token)
        //return console.log(response.data,response.data.dashboard && location.search);
        if (response.data.dashboard) {
          return navigate(response.data.dashboard);
        }else if (location.search==='?redirect=true' && window.history.length===0) {
          return navigate("/");
        }
        return navigate("/dashboard/main");
      }
    })
  }

  return <>
          <Typography component="h1" className="t-24">
            {"Bienvenido"}
          </Typography>
          <form  onSubmit={handleSubmit}>
            <Box sx={{ mt: 1 }}>

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  {"Nombre de Usuario"}
                </InputLabel>
                <OutlinedInput
                    color="secondary"
                    type="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    defaultValue="programacion@ingeeniar.com"
                    onChange={useInputs}
                    startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                    label={"Nombre de Usuario"}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  {"Contraseña"}
                </InputLabel>
                <OutlinedInput
                    required
                    color="secondary"
                    fullWidth
                    name="password"
                    defaultValue="password"
                    label={"Contraseña"}
                    type="password"
                    id="password"
                    onChange={useInputs}
                    startAdornment={<InputAdornment position="start"><GroupIcon/></InputAdornment>}
                />
              </FormControl>
              <Grid container sx={{mt:0}} spacing={1}>
                <Grid item  xs={12}  className="text-center">
                  <Button
                    type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained">
                    {"Iniciar sesión"}
                  </Button>
                </Grid>
                <Grid item md={12} xs={12}  align={"center"}>
                  <NavLink  to="/auth/recover" >
                    {"Olvidé contraseña"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </form>
        </>
}

export default Login
