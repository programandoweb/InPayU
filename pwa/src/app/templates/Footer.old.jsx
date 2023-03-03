import React from 'react';
import { Grid } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import image from '../../assets/images/logo.png';
import Typography from '@mui/material/Typography';
import {modules} from '../../helpers/modules';
import { NavLink } from "react-router-dom";
import StateContext from '../../helpers/ContextState';

const App=()=>{
    const context                           =   React.useContext(StateContext);

    return  <Grid container justifyContent="center " className='footer text-white'>
              <Grid item xs={12} md={8}>
                <Grid container sx={{pt:5,pb:5,pr:4,pl:4}}>
                  <Grid item xs={12} md={3} >
                    <Grid sx={{width:150}}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={image}
                        alt="Programandoweb"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={3} >
                    {
                      modules.map((page,key) =>{
                        if (!page.menu) {
                          return false
                        }
                        return  <Grid sx={{mb:2}} className="t-12" key={key}>
                                  <NavLink to={page.slug}>
                                    {page.name}
                                  </NavLink>
                                </Grid>
                      })
                    }
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Typography className="t-12">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>



}
export default App
