import React from 'react';
import Grid from '@mui/material/Grid';
import NotFound from '../../../components/NotFound';
import Typography from '@mui/material/Typography';
import {
  Routes,
  Route,
} from "react-router-dom";

import {modules} from '../../../helpers/modules_in';

import TopBar from '../../../components/Menu/TopBar'
import SidebarDesktop from '../../../components/Menu/SidebarDesktop'
import SidebarMobile from '../../../components/Menu/SidebarMobile'
import { useNavigate,useLocation } from "react-router-dom";
import {useStore} from '../../../helpers/useStore';


const App=()=>{
    const store                           =   useStore();
    const navigate                        =   useNavigate();
    const location                        =   useLocation();
    const [clickOutSide,setClickOutSide]  =   React.useState(false)
    const [open,setOpen]                  =   React.useState(false)
    const [title,setTitle]                =   React.useState(false)


    React.useEffect(()=>{
      if (store.get("user").id) {
        setOpen(true)
      }else {
        return navigate("/auth/login");
      }
    },[store,navigate])

    React.useEffect(()=>{
      if (modules&&modules.length>0) {
        const pathname  =   location.pathname.substr(0,location.pathname.lastIndexOf("/"))
        let result      =   ""

        modules.map((row,key)=>{
          if (row.items && row.items.length>0) {
            row.items.map((row2,key2)=>{
              const result    =   row2.items.find(search=>search.slug.includes(pathname) || (search.url && search.url.includes(pathname)))
              if (result) {
                setTitle({url:row2.url||row2.slug,label:result.name})
              }
            })
          }
          // const result    =   row.items.find(search=>search.slug.includes(pathname) || search.items.find(search2=>search2.slug.includes(pathname) ))

        })


        // const result    =   modules.find(
        //                                     search=>search.items.find(  search2=>search2.slug.includes(pathname) ||
        //                                                                 (search2.url && search2.url.includes(pathname))  ||
        //                                                                 search2.items.find(search3=>search3.slug.includes(pathname)) ))
        // console.log(modules,result);
      }
    },[location])

    /*
      creé esta función porque este es un hijo de un route previo
      es decir, si tengo /dashboard*
      este debe desaparecer y colocar lo siguiente porque sino no hace match
    */
    const str_replace=(slug)=>{
      if (!slug) {
        return false
      }
      return slug.replace("/dashboard","");
    }

    return  <>
              {open?<Grid>
                      <Grid container >
                        <Grid item xs={12} md={2} className="sidebar">
                          <Grid sx={{display: { xs: "none", lg: "block" }}}>
                            <SidebarDesktop clickOutSide={clickOutSide} setClickOutSide={setClickOutSide}/>
                          </Grid>
                          <Grid sx={{display: { xs: "block", lg: "none" }}}>
                            <SidebarMobile clickOutSide={clickOutSide} setClickOutSide={setClickOutSide}/>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={10} onClick={()=>setClickOutSide(true)} className="max100vh">
                          <TopBar title={title.label}/>
                          <Grid container justifyContent="center">
                            <Grid item xs={12} md={12}  sx={{m:4}} className="">
                              <Routes>
                                {modules.map((row,key)=>{

                                  if (row.items && Array.isArray(row.items) && row.items.length>0) {
                                    return row.items.map((row2,key2)=>{
                                      if (row2.items && Array.isArray(row2.items) && row2.items.length>0) {
                                        return row2.items.map((row3,key3)=>{
                                          return  <Route exact key={key3} path={str_replace(row3.slug)} element={<>{<row3.component/>}</>}/>
                                        })
                                      }
                                      return  <Route exact key={key2} path={str_replace(row2.slug)} element={<>{<row2.component/>}</>}/>
                                    })
                                  }
                                  return  <Route exact key={key} path={str_replace(row.slug)} element={<>{<row.component/>}</>}/>
                                })}
                                <Route component={NotFound} />
                              </Routes>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>:false
              }
            </>
}
export default App
