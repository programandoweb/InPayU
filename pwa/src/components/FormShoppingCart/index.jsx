import * as React from 'react';
import Box from '@mui/material/Box';
//import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button   from '@mui/material/Button';
import ReactHtmlParser from 'react-html-parser';
import StateContext from '../../helpers/ContextState';
import {useStore} from '../../helpers/useStore';
import useShoppingCart from '../../helpers/useShoppingCart';
import {  useNavigate,
          useLocation
        } from "react-router-dom";


let inputs      =   {package:""}
let context     =   false
let store       =   false


const Component =   ({data,events}) =>{
  const shoppingCart  =   useShoppingCart()
  const navigate      =   useNavigate();
  const location      =   useLocation();
  store               =   useStore();
  context             =   React.useContext(StateContext);

  const handleAddShoppingCart = ()  =>{
    /*
      recojo los datos del artículo
    */
    let   result            =   data.data2.find((search)=>search.id===parseInt(inputs.package))

    let   shoppingCartItem  =   {}
    if (!result) {
      return false
    }else {

      shoppingCartItem.ToPay        =   "courses/id/"+data.id
      shoppingCartItem.UrlBuy       =   location.pathname
      shoppingCartItem.offer        =   result.offer
      shoppingCartItem.price        =   result.price
      shoppingCartItem.title        =   result.title+" - "+data.content_open.label+" - "+ (result.offer || result.price)

      //return console.log(result,shoppingCartItem);
      shoppingCart.add(shoppingCartItem).then((response)=>{
        if (response.length>0 && !context.user) {
          store.set("location",{location:location.pathname,redirec:"/toPay"})
          return navigate("/auth/login?redirect=true");
        }else if (response.length>0 && context.user) {
          context.post("api/admin/shoppingCart/addCustom",{shoppingCart:JSON.stringify(response,context.getCircularReplacer())},false,false).then((resp)=>{
            //return navigate("/toPay");
          })
        }
      })
    }

  }

  const onChange=(e)=>{
    inputs[e.target.name]   =     e.target.value
  }

  return  <React.Fragment>
            <CardContent>
              {data.data2 && data.data2.length>0?<>
                {data.data2.map((row,key)=>{
                  return      <Box className="box-plains " key={key}>
                                <Grid container className="text-white22">
                                  <Grid item xs={1} className="text-center">
                                    <input type="radio" className="select_radio" name="package" value={row.id} onClick={onChange}/>
                                  </Grid>
                                  <Grid item xs={11} >
                                    <Grid className="t-12" sx={{mb:1}}>
                                      {row.title}
                                    </Grid>
                                    <Grid className="t-24 bold" sx={{mb:2}}>
                                      <span className="offer">Ahora USD{row.offer}</span>
                                      <div className="price t-16">Antes USD{row.price}</div>
                                    </Grid>
                                    <Typography variant="p" className="t-12">
                                      { ReactHtmlParser(row.content) }
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                })}
              </>:false}
              <Grid item xs={12} className="text-center mb-1">
                <Button fullWidth variant={"contained"} color="primary" onClick={handleAddShoppingCart}>Comprar</Button>
              </Grid>
            </CardContent>
          </React.Fragment>
}

let getInit

export default function OutlinedCard({data,reference}) {

  const context                 =   React.useContext(StateContext);
  const [data2,setData]         =   React.useState({})
  const [loading, setLoading]   =   React.useState(false);

  getInit=(mounted)=>{
    setLoading(true)
    context.post("api/packages/Destacado",{data:data,reference:reference},false,false).then((response)=>{
      if (response && response.data && response.data.packages) {
        setData(response.data.packages)
      }
      setLoading(false)
    })
  }

  React.useEffect(()=>{
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  },[data]);

  return  <Box sx={{ minWidth: 275 }}>
            {data2 && data2.length>0?<Box className="membership"><Component events={{loading,setLoading}} data={{...data,data2}}/></Box>:false}
          </Box>

}
