import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { NavLink } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ReactHtmlParser from 'react-html-parser';
import Button from '../ShoppingCart/Button';
import { useLocation } from "react-router-dom";
import {format} from '../../helpers/functions';

const App=({data})=>{

  const location                =   useLocation();
  const [pathname,setPathname]  =   React.useState("/")
  React.useEffect(() => {

    if (location.pathname==='/') {
      return setPathname(location.pathname+"")
    }

    const split   = location.pathname.split("/")
    let pathname_ = ""
    split.map((row,key)=>{
      if ((key+1)<split.length) {
        return pathname_  = pathname_+row+"/"
      }
      return false
    })
    setPathname(pathname_)
  }, [location]);

  return  <Grid container justifyContent="center"  alignItems="center" spacing="5">
              {
                data && data.length>0?<>
                  {data.map((row,key)=>{

                      return  <Grid item xs={11} md={4} align="justify" key={key} sx={{mb:3}}>

                                <Paper className="item-productos">
                                  {
                                    row.multimedia && row.multimedia.length>0 && row.multimedia[0]?<NavLink to={(row.slugByCategory||pathname+row.slug)}><Grid className="zoom-content"><Grid className="zoom">
                                      <CardMedia
                                                  sx={{ height: "100%" }}
                                                  image={row.multimedia[0].fullpath}
                                                  title="green iguana"

                                      />
                                    </Grid></Grid></NavLink>:false
                                  }
                                  <Typography component="h2" className="t-14" sx={{mt:1}}>
                                    <b>{ ReactHtmlParser(row.label) }</b>
                                  </Typography>
                                  <Typography component="h3" className="t-12" sx={{mb:1}}>
                                    { ReactHtmlParser(row.summary) }
                                  </Typography>
                                  <Grid container>
                                    <Grid item xs={12} md={6}>
                                      <Typography component="div" className="offer">
                                          Desde
                                          <Grid className="offer-amount">
                                            <b>${format(row.offer||row.price)}</b>
                                          </Grid>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} align="center" sx={{mt:{xs:4,md:0}}}>
                                      <Button data={row} label="Agregar al carrito"/>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              </Grid>
                  })}
                </>:false
              }
            </Grid>
}
export default App
