import React from 'react';
import Grid from '@mui/material/Grid';
import Loading from '../../../components/Loading/Loading2023';
import StateContext from '../../../helpers/ContextState';
import Carousel from '../../../components/Carousel';
import Relacionados from '../../../components/Relacionados';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PanToolIcon from '@mui/icons-material/PanTool';
import CachedIcon from '@mui/icons-material/Cached';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import SpaIcon from '@mui/icons-material/Spa';

let getInit

const App=()=>{
  const [data,setData]          =   React.useState({data:[],links:[]})
  const [loading, setLoading]   =   React.useState(true);
  const context                 =   React.useContext(StateContext);

  getInit=(mounted)=>{
    setLoading(true)
    context.get('api/v1/freeZone/main',{...context.user},false,false).then((response)=>{
      if (response&&response.data) {
        setData(response.data)
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
  }, []);

  return  <Grid container justifyContent="center"  alignItems="center" spacing="2">
            {
              !loading?<>
                <Carousel data={data.banners||[]} />
                {
                  data && data.banners2 && data.banners2.length>0?<>
                    {data.banners2.map((row,key)=>{
                      if (key>1) {
                        return false
                      }
                      return  <Grid item sx={{mt:0,mb:0}} xs={12} className="bg-white" key={key}>
                                <Grid container  spacing="2">
                                  {(key % 2) == 0?<>

                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={4}>
                                                        <CardMedia component="img" src={row.fullpath} sx={{height:"100%"}}/>
                                                      </Grid>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={2}>
                                                      </Grid>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={4}>
                                                        <Typography component="h2" className="t-24"> {row.name} </Typography>
                                                        <Typography component="div" className="t-14"> {row.description} </Typography>
                                                        <Grid sx={{mt:3}}>
                                                          <Button variant="contained">Comprar Ahora <ArrowForwardIcon sx={{ml:2}}/></Button>
                                                        </Grid>
                                                        <Grid sx={{mt:3}}>
                                                          <Grid container  spacing="2">
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-yellow rounded ">12</Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Años de Garantía
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded ">11´</Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Altura
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded "><PanToolIcon/></Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Adaptabilidad
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded "><CachedIcon/></Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Flexible
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>

                                      </>:<>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={2}>
                                                      </Grid>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={4}>
                                                        <Typography component="h2" className="t-24"> {row.name}  </Typography>
                                                        <Typography component="div" className="t-14"> {row.description} </Typography>
                                                        <Grid sx={{mt:3}}>
                                                          <Button variant="contained">Comprar Ahora <ArrowForwardIcon sx={{ml:2}}/></Button>
                                                        </Grid>
                                                        <Grid sx={{mt:3}}>
                                                          <Grid container  spacing="2">
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-yellow rounded ">5</Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Años de Garantía
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded "><EarbudsIcon/></Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Ortopédico
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded "><SpaIcon/></Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Natural
                                                              </Grid>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                              <Grid className="circle-white rounded "><CachedIcon/></Grid>
                                                              <Grid className="circle-yellow-text" align="center" sx={{mt:1}}>
                                                                Flexible
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        </Grid>
                                                      </Grid>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={1}>
                                                      </Grid>
                                                      <Grid item sx={{mt:5,mb:5}} xs={12} md={4}>
                                                        <CardMedia component="img" src={row.fullpath} sx={{height:"100%"}}/>
                                                      </Grid>


                                  </>}

                                </Grid>
                              </Grid>
                    })}

                  </>:false
                }
                <Grid item sx={{mt:0,mb:0}} xs={12} className="bg-white">
                  <Grid container justifyContent="center"  alignItems="center" >
                    <Grid item sx={{mt:0,mb:5}} xs={10} >
                      <Grid container justifyContent="center"  alignItems="center" spacing="2">
                        <Typography component="div" className="h0 text-color-secondary border-bottom-2" align="center" sx={{mb:3}}>
                          ¡Conoce más!
                        </Typography>
                        <Relacionados data={(data.relacionados||[])}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {
                  data && data.banners2 && data.banners2.length>0?<>
                    {data.banners2.map((row,key)=>{
                      if (key<2) {
                        return false
                      }
                      return  <Grid item sx={{mt:0,mb:0}} xs={12}  key={key}>
                                <Grid className="position-relative">
                                  <Grid className="position-absolute-texto">
                                    <Grid>
                                      <Typography component="h2" className="position-absolute-title2"> {row.name}  </Typography>
                                    </Grid>
                                    <Grid>
                                      <Typography component="div" className="position-absolute-description"> <b>{row.description}</b> </Typography>
                                    </Grid>
                                  </Grid>
                                  <CardMedia  component="img" src={row.fullpath}/>
                                </Grid>
                              </Grid>
                    })}

                  </>:false
                }
              </>:<Loading/>
            }
          </Grid>
}

export default App
