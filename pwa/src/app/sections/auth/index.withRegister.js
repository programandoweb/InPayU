import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Routes,
  Route,
  //NavLink
} from "react-router-dom";

import Login from './Login'
import Recover from './Recover'
import Register from './Register'
import RegisterContinue from './RegisterContinue'

const modules = [
  {
    url:'/',
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
  {
    url:'/register/continue/:id',
    component:RegisterContinue
  },
]

const Auth=()=>{
  return <Grid container component="main" sx={{ height: '100vh' }}>
            {window.location.pathname.includes("register/continue/")===false?<Grid item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                          backgroundImage:    'url(https://source.unsplash.com/random)',
                          backgroundRepeat:   'no-repeat',
                          backgroundSize:     'cover',
                          backgroundPosition: 'center',
                      }}
            />:false}
            <Grid item  xs={12}
                        sm={window.location.pathname.includes("register/continue/")===false?8:12}
                        md={window.location.pathname.includes("register/continue/")===false?5:12}
                        component={Paper}
                        elevation={6}
                        square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Routes>
                  {modules.map((row,key)=>{
                    return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                  })}
                </Routes>
              </Box>
            </Grid>
          </Grid>
}
export default Auth
