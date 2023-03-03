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
  }, [context.lang]);

  return  <Grid container sx={{pt:{xs:0,md:4}}}>
            <Grid item xs={12} md={8}>
              {!loading?<Grid></Grid>:false}
              {
                data.data.map((row,key)=>{
                  return  <Grid sx={{mb:2}} key={key}>
                            <Item data={row}/>
                          </Grid>
                })
              }
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid></Grid>
            </Grid>
          </Grid>
}
export default App
