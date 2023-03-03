import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import StateContext from '../../../helpers/ContextState';
import Carousel from '../../../components/Carousel';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Button from '../../../components/ShoppingCart/Button';
import { NavLink } from "react-router-dom";
import {format} from '../../../helpers/functions';
import Loading from '../../../components/Loading/Loading2023';

let getInit

const App=()=>{
  const [carousel,setCarousel]  =   React.useState([])
  const [data,setData]          =   React.useState({data:[],links:[]})
  const context                 =   React.useContext(StateContext);
  const [loading, setLoading]   =   React.useState(false);
  const location                =   useLocation();

  getInit=(mounted)=>{
    setLoading(true)
    context.get(false,{...context.user},false,false).then((response)=>{
      if (response&&response.data) {
        setData(response.data)
      }
      if (response&&response.data&&response.data.image) {
        let carousel_=[]
            carousel_.push({image_fullurl:response.data.image,label:response.data.label,text:response.data.summary})
        setCarousel(carousel_)
      }
      setLoading(false)
    })
  }


  React.useEffect(() => {
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, [location]);

  return  <Grid container justifyContent="center"  alignItems="center" spacing="2">
            {
              !loading?<>
                <Carousel data={carousel}/>
                <Grid item xs={11} md={10} align="center" sx={{mb:{xs:5,md:3}}}>
                  <Typography component="div" className="h0">
                    <b>{ ReactHtmlParser(data.label) }</b>
                  </Typography>
                  <Typography component="div" className="t-12">
                    { ReactHtmlParser(data.descripcion) }
                  </Typography>
                </Grid>
                <Grid item xs={11} md={10} align="center" sx={{mb:{xs:5,md:3}}}>
                  <Grid container justifyContent="center"  alignItems="center" spacing="5">
                    {
                      data.productos && data.productos.length>0?<>
                        {data.productos.map((row,key)=>{
                            return  <Grid item xs={11} md={4} align="justify" key={key} sx={{mb:3}}>

                                      <Paper className="item-productos">
                                        {
                                          row.multimedia && row.multimedia.length>0 && row.multimedia[0]?<NavLink to={row.slug}><Grid className="zoom-content"><Grid className="zoom">
                                            <CardMedia
                                                        sx={{ height: "100%" }}
                                                        image={row.multimedia[0].fullpath}
                                                        title="green iguana"

                                            />
                                          </Grid></Grid></NavLink>:false
                                        }
                                        <Typography component="h2" className=" t-14 item-productos-title " sx={{mt:1}}>
                                          <b>{ ReactHtmlParser(row.label) }</b>
                                        </Typography>
                                        <Typography component="h3" className="t-12" sx={{mb:1}}>
                                          { ReactHtmlParser(row.summary) }
                                        </Typography>
                                        <Grid container>
                                          <Grid item xs={12} md={6} >
                                            <Typography component="div" className="offer" >
                                                Desde
                                                <Grid className="offer-amount" >
                                                  <b>${format(row.offer||row.price)}</b>
                                                </Grid>
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={6} align="center" sx={{mt:{xs:2,md:0}}}>
                                            <Button data={row} label="Agregar al carrito"/>
                                          </Grid>
                                        </Grid>
                                      </Paper>
                                    </Grid>
                        })}
                      </>:false
                    }
                  </Grid>
                </Grid>
              </>:<Loading/>
            }
          </Grid>
}
export default App
