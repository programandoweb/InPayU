import React from 'react';
import {useStore} from './helpers/useStore';
import { ThemeProvider } from '@mui/material/styles';
import StateContext from './helpers/ContextState';
import Modal from './components/Modal';
import Snackbars from './components/Snackbars';
import Loading from './components/Loading/Loading2';
import NotFound from './components/NotFound';
import Dashboard from './app/sections/dashboard';
import Auth from './app/sections/auth';
import FreeZone from './app/sections/freezone';
import {getCircularReplacer} from './helpers/functions';
import {theme} from './helpers/theme';
import localDatabase from './helpers/indexedDB';
import './App.css';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {  get,
          post,
          setFunctions,
        } from './helpers/api';

const timeout     =   5000
let   store       =   false
let   init        =   false
let   intervalID;

const App=()=>{

  React.useEffect(()=>{
    localDatabase.createConnection(process.env.REACT_APP_DBNAME)
  },[])

  /*necesito el store para determminar si un usuario está logueado o no*/
  store                                       =   useStore();
  const [user,setUser]                        =   React.useState({});
  const [token,setToken]                      =   React.useState(false);


  /*simple componente para un efecto de recargar la página*/
  const [loading,setLoading]                  =   React.useState(true);
  const [modalShow, setModalShow]             =   React.useState(false);


  /*
    array items
  */
  const [shoppingCart, setShoppingCart]       =   React.useState(false);

  /*
    parámtros
    {message:string}
  */
  const [snackbars,   setSnackbars]             =   React.useState(false);
  const [openMessage, setOpenMessage]           =   React.useState(false);


  /*acá colocar todas las variables que vienen del backend a front*/
  const [system,setSystem]                      =   React.useState({});

  const [internet, setInternet]                 =   React.useState(true);

  const internetStatus=(response)=>{
    if (response.message!=='Network Error') {
      clearInterval(intervalID);
      setOpenMessage(false)
      setInternet(true)
    }else if (response.message==='Network Error') {
      setOpenMessage("Estamos presentando inconvenientes de conexión...")
      setInternet(false)
    }
  }

  init=()=>{
    get('api/v1/',{},false,false).then((response)=>{
      if (response&&response.data) {
        setSystem(response.data)
        setInternet(true)
        clearInterval(intervalID);
      }
    })
  }

  React.useEffect(()=>{
    if (!internet) {
      intervalID = setInterval(function(){
        init();
      }, timeout);
    }
  },[internet])

  const provider=()=>{
    return {
              setSnackbars:setSnackbars,
              openMessage:openMessage,
              setOpenMessage:setOpenMessage,
              loading:loading,
              setLoading:setLoading,
              token:token,
              setToken:setToken,
              system:system,
              setSystem:setSystem,
              get:get,
              post:post,
              user:user,
              setUser:setUser,
              setModalShow:setModalShow,
              shoppingCart:shoppingCart,
              setShoppingCart:setShoppingCart,
              getCircularReplacer:getCircularReplacer
            }
  }

  setFunctions({
                  localDatabase:localDatabase,
                  internetStatus:internetStatus,
                  snackbars:snackbars,
                  setSnackbars:setSnackbars,
                  openMessage:openMessage,
                  setOpenMessage:setOpenMessage,
                  store:store,
                  setLoading:setLoading,
                  setModalShow:setModalShow,
                  user:(user)?user:store.get("user"),
                });

  React.useEffect(()=>{
    store.getStoreAsync("user").then((response)=>{
      if (response&&response.token) {
        setUser(response)
      }
      setLoading(false)
    })
  },[])

  React.useEffect(()=>{
    init()
  },[])


  React.useEffect(()=>{
    if (!shoppingCart) {
      return
    }
    if (shoppingCart.length===0 ) {
      store.getStoreAsync("shoppingCart").then((response)=>{
        setShoppingCart(response)
      })
    }else if (shoppingCart.length>0) {
      store.set("shoppingCart",shoppingCart)
    }
  },[shoppingCart])

  return  <ThemeProvider theme={theme}>
            <StateContext.Provider value={provider()}>
              {modalShow?<Modal open={modalShow} setOpen={setModalShow}/>:false}
              <Router>
                <Routes>
                  {!user.token?<Route path={"/dashboard/*"} element={<Auth/>}/>:false}
                  {!user.token?<Route path={"/auth/login/*"} element={<Auth/>}/>:false}
                  {user.token?<Route path={"/dashboard/*"} element={<Dashboard/>}/>:false}
                  {user.token?<Route path={"/dashboard/*"} element={<Dashboard/>}/>:false}
                  <Route path="*" element={<FreeZone/>}/>
                  <Route component={NotFound} />
                </Routes>
              </Router>
              {loading?<Loading setLoading={setLoading} loading={loading}/>:false}
              {snackbars?<Snackbars setOpen={setSnackbars} open={snackbars}/>:false}
            </StateContext.Provider>
          </ThemeProvider>
}

export default App;
