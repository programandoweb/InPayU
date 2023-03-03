import Grid from '@mui/material/Grid';
import {modules} from './zones';

import {
  Routes,
  Route,
} from "react-router-dom";

import Header from './Header'
import Footer from './Footer'

const Freezone=()=>{

  return  <Grid component="main" sx={{ mt:{md:12,xs:7}, minHeight:{xs:"80vh", md:'100vh'} }}>
              <Header/>
              <Routes>
                {modules.map((row,key)=>{
                  return  <Route exact key={key} path={(row.slug)} element={<>{<row.component/>}</>}/>
                })}
              </Routes>
              <Footer/>
          </Grid>

}

export default Freezone
