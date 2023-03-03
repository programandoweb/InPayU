import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './Main'
import Add from './Publicaciones'


const modules = [
  {
    url:'/',
    component:Home
  },
  {
    url:'/add',
    component:Add
  },

]

const App=()=>{
    return  <Grid component="main" >
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
            </Grid>
}
export default App
