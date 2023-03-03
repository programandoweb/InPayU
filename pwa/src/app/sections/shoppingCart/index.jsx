//import Grid from '@mui/material/Grid';
import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './Main'

const modules = [
  {
    url:'/toPay',
    component:Main
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
