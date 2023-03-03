import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './Main'


const modules = [
  {
    url:'/',
    component:Home
  },
]

const App=()=>{
    return  <Grid component="main" sx={{ mt:{md:8,xs:8}, minHeight:{xs:"80vh", md:'82vh'} }}>
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
            </Grid>
}
export default App
