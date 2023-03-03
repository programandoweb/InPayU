import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import StateContext from '../../../helpers/ContextState';
import CardMedia from '@mui/material/CardMedia';
import image from '../../../assets/images/logo.png';
import image2 from '../../../assets/images/eventos.jpg';
import {
  Routes,
  Route,
} from "react-router-dom";

import Login from './Login'
import Recover from './Recover'
import Register from './Register'


// let getInit   =   false
// let context   =   false

const modules = [
  {
    url:'/login',
    component:Login
  },
  {
    url:'/',
    component:Login
  },
  {
    url:'/login/:uid',
    component:Login
  },
  {
    url:'/recover',
    component:Recover
  },
  {
    url:'/register',
    component:Register
  },
]

const Auth=()=>{
  //const [data,setData]  =   React.useState({text:false,text2:false,text3:false})
  //context               =   React.useContext(StateContext);

  // getInit=(mounted)=>{
  //   context.get(false,{...context.user},false,false).then((response)=>{
  //     if (response&&response.data) {
  //       //setData(response.data)
  //     }
  //   })
  // }


  // React.useEffect(() => {
  //   let mounted =   true
  //   getInit(mounted)
  //   return function cleanup() {
  //     mounted   =   false
  //   }
  // }, []);


  return <Grid>
            <Grid container sx={{ height: '100vh' }}>
              {window.location.pathname.includes("register/continue/")===false?<Grid item xs={12}>
              <Grid container justifyContent="center" sx={{ height: '100vh' }} className="overflow-hidden">
                  <Grid item xs={false} md={1} className="bg-white">

                  </Grid>
                  <Grid item xs={12} md={3} sx={{ pt:{xs:10,md:20} }} className="bg-white">
                    <Grid align="center" sx={{pl:10,pr:10}}>
                      <CardMedia
                        component="img"
                        image={image}
                        alt="Programandoweb"
                      />
                    </Grid>
                    <Box
                      sx={{
                        my: 4,
                        mx: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Routes>
                        {modules.map((row,key)=>{
                          return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                        })}
                      </Routes>
                    </Box>

                  </Grid>
                  <Grid item xs={false} md={1} className="bg-white">

                  </Grid>
                  <Grid item xs={12} md={7} className="screen-text-center2">
                    <Grid className="">
                      <Typography>
                        <CardMedia
                          component="img"
                          image={image2}
                          alt="Programandoweb"
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>:false}
            </Grid>
        </Grid>
}
export default Auth
