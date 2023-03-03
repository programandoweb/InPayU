import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import Item from './Item';



let getInit

const App=()=>{
  const [data,setData]        =   React.useState({data:[],links:[]})
  const context               =   React.useContext(StateContext);
  const [loading, setLoading] =   React.useState(false);
  
  getInit=(mounted)=>{
    setLoading(true)
    context.get(false,{...context.user},false,false).then((response)=>{
      if (response&&response.data) {
        //setData(response.data)
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
  }, [context.lang]);

  return  <Grid container sx={{pt:{xs:0,md:4}}}>

          </Grid>
}
export default App
