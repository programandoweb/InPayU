import React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import image from '../../assets/images/logoWhite.png';
import {modules} from '../../helpers/modules_in';
//import StateContext from '../../helpers/ContextState';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const App=({clickOutSide,setClickOutSide})=>{
  const [active,setActive]    =   React.useState(false)
  const [active2,setActive2]  =   React.useState(false)
  //const context               =   React.useContext(StateContext);
  const location              =   useLocation();

  React.useEffect(()=>{
    if (clickOutSide) {
      setActive(false)
      setClickOutSide(false)
    }
  },[clickOutSide,setClickOutSide])

  React.useEffect(() => {
    let result    =   false
    let porciones =   location.pathname.split('/');
    if (porciones[2]) {
      result      =   modules.findIndex((search)=>search.slug.includes(porciones[2]) )
      setActive2(result)
    }else {
      setActive2(false)
    }

  }, [location]);

  const handleActiveLink=(key)=>{
    setActive(active===key?false:key)
    setActive2(key)
  }

  return  <Grid align="center" sx={{mt:4}}>
            <Grid sx={{width:150,mb:5}} align="center">
              <CardMedia
                component="img"
                image={image}
                alt="Programandoweb"
              />
            </Grid>

            {
              modules.length>0?<>
                {modules.map((row,key)=>{
                  return  <Grid  align="left" key={key} className={active===key || active2===key?"sidebar-items sidebar-items-select":"sidebar-items"}>

                              <Grid container className="position-relative" onClick={()=>handleActiveLink(key)}>
                                <Grid item xs={false} md={2}>
                                  {row.icon}
                                </Grid>
                                <Grid item xs={false} md={9}>
                                  {
                                    row.items.length===0?<NavLink to={row.slug} onClick={()=>handleActiveLink(key)}>
                                      <Typography component="div">{row.name}</Typography>
                                    </NavLink>:<Typography component="div">{row.name}</Typography>
                                  }
                                </Grid>
                                <Grid item xs={false} md={1}>
                                  {key>0?<KeyboardArrowDownIcon/>:false}
                                </Grid>
                                {
                                  active===key && (row.items && row.items.length>0) ?  <Grid className={row.menu_simple?"position-absolute submenu2":"position-absolute submenu"}>
                                              <Grid container>
                                                {row.items.map((row2,key2)=>{
                                                  return  <Grid item xs={12} md={row2.items.length>0 || row2.name==="Planimetría"?6:12} key={key2}>
                                                            <Grid sx={{mb:3}}>
                                                              <Typography component="div" className="sidebar-items-title">
                                                                <Grid container spacing="8">
                                                                  <Grid item>
                                                                    {row2.icon}
                                                                  </Grid>
                                                                  <Grid item className={row2.items.length===0?"text-white":""}>
                                                                    <NavLink className="item-side-bar" to={row2.slug} onClick={()=>handleActiveLink(key)}>
                                                                      {row2.name}
                                                                    </NavLink>
                                                                  </Grid>
                                                                </Grid>
                                                              </Typography>

                                                              {
                                                                row2.items && row2.items.length>0?<ul>
                                                                  {row2.items.map((row3,key3)=>{
                                                                    if (!row3.menu) {
                                                                      return false
                                                                    }
                                                                    return  <li key={key3}>
                                                                              {row3.slug!=='/'? <NavLink to={row3.url||row3.slug} onClick={()=>handleActiveLink(key)}>
                                                                                                  {row3.name}
                                                                                                </NavLink>:<>
                                                                                                  {row3.name}
                                                                                                </>
                                                                              }
                                                                            </li>
                                                                  })}

                                                                </ul>:false
                                                              }

                                                            </Grid>
                                                          </Grid>
                                                })}

                                              </Grid>
                                            </Grid>:false

                                }

                              </Grid>

                          </Grid>
                })}
              </>:false
            }

          </Grid>
}
export default App
