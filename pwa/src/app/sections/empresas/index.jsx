import React from 'react';
import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './Main'
import Menu from '../../../components/Menu'
import SidebarDesktop from '../../../components/Menu/SidebarDesktop'
import SidebarMobile from '../../../components/Menu/SidebarMobile'


const modules = [
  {
    url:'/main',
    component:Home
  },
  {
    url:'/main/:slug',
    component:Home
  },
]

const App=()=>{
    const [clickOutSide,setClickOutSide]  = React.useState(false)
    return  <Grid component="main" >
              <Grid container >
                <Grid item xs={12} md={2} className="sidebar">
                  <Grid sx={{display: { xs: "none", lg: "block" }}}>
                    <SidebarDesktop clickOutSide={clickOutSide} setClickOutSide={setClickOutSide}/>
                  </Grid>
                  <Grid sx={{display: { xs: "block", lg: "none" }}}>
                    <SidebarMobile clickOutSide={clickOutSide} setClickOutSide={setClickOutSide}/>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={10} onClick={()=>setClickOutSide(true)}>
                  11
                </Grid>
              </Grid>

              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
            </Grid>
}
export default App
