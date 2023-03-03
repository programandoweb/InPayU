import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './Main'


const modules = [
  {
    url:'/',
    component:Main
  },
]


const App=()=>{
    return  <Grid>
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
            </Grid>
}
export default App
