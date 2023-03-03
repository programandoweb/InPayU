//import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './Main'
import Categoria from './Categoria'
import Producto from './Producto'

const modules = [
  {
    url:'/',
    component:Main
  },
  {
    url:'/:slug',
    component:Categoria
  },
  {
    url:'/:category/:slug',
    component:Producto
  },
]

const App=()=>{
    return  <>
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={row.url} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
            </>
}
export default App
