import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './MainProductos'
import Add from '../multimedia/Add'
import Producto from './Productos'
import NotFound from '../../../components/NotFound';


const modules = [
  {
    url:'/list',
    component:Home
  },
  {
    url:'/add',
    component:Add
  },
  {
    url:'/list/add',
    component:Producto
  },
  {
    url:'/list/:id',
    component:Producto
  },

]

const App=()=>{
    return  <Grid component="main" >
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
                <Route component={NotFound} />
              </Routes>
            </Grid>
}
export default App
