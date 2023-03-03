import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";
import Characteristics from '../../../components/Characteristics';
import Gallery from '../../../components/Carousel/Gallery';
import Button from '../../../components/ShoppingCart/Button';
import Tabs from '../../../components/Tabs';
import Relacionados from '../../../components/Relacionados';
import {format} from '../../../helpers/functions';
import Loading from '../../../components/Loading/Loading2023';

let getInit

const App=()=>{
  //const [carousel,setCarousel]  =   React.useState([])
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
      // if (response&&response.data&&response.data.image) {
      //   let carousel_=[]
      //       carousel_.push({image_fullurl:response.data.image,label:response.data.label,text:response.data.summary})
      //   setCarousel(carousel_)
      // }
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
                <Grid item xs={11} md={10} align="center" sx={{mb:{xs:5,md:3}}}>
                  <Grid container justifyContent="center"  alignItems="top" spacing="50">
                    <Grid item xs={12} md={6} align="center" sx={{mb:{xs:5,md:3}}}>
                      <Gallery data={data.multimedia||[]}/>
                    </Grid>
                    <Grid item xs={12} md={6} align="left" sx={{mb:{xs:5,md:3}}}>
                      <Grid className="border-top">
                      </Grid>
                      <Typography component="div" className="h0 text-color-secondary">
                        <b>{ ReactHtmlParser(data.label) }</b>
                      </Typography>
                      <Typography component="div" className="text-color-secondary">
                        <b>Precio</b>
                      </Typography>
                      <Grid container justifyContent="left"  alignItems="left" spacing="2">
                        <Grid item xs={12} md={4} className="price">
                          <Typography component="div" className="offer-price">
                            ${format(data.price)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} >
                          <Typography component="div" className="offer-amount">
                            <b>${format(data.offer)}</b>
                          </Typography>
                        </Grid>
                      </Grid>

                      <Characteristics data={(data.characteristics||[])}/>
                      <Typography component="div" className="text-color-secondary t-12">
                        Impuesto incluido. Los gastos de ewnvío se calculan en la pantalla de pagos.
                      </Typography>
                      <Grid sx={{mt:2}}>
                        <Button data={data} variant="outlined" fullWidth={true} label="Agregar al carrito"/>
                      </Grid>
                      <Grid sx={{mt:2}}>
                        <Button data={data} fullWidth={true} label="Comprar ahora" ico={true} pay={true}/>
                      </Grid>
                      <Typography component="div" className="t-12">
                        { ReactHtmlParser(data.descripcion) }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Tabs data={{
                                description:(data.description||""),
                                incluye:(data.incluye||[]),
                                ficha:(data.ficha||[]),
                                envio:(data.envio||[]),
                              }}
                  />
                  <Relacionados data={(data.relacionados||[])}/>
                </Grid>
              </>:<Loading/>
            }
          </Grid>
}
export default App
