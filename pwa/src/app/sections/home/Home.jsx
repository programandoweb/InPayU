import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';


let getInit

const App=()=>{
  const [data,setData]        =   React.useState({slider:false,categories:false})
  const context               =   React.useContext(StateContext);

  getInit=(mounted)=>{
    console.log(context);
    context.get('api/v1/freeZone/home',{...context.user},false,false).then((response)=>{
      if (response&&response.data) {
        setData(response.data)
      }
    })
  }

  React.useEffect(() => {
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, []);

  return  <Grid container>
            <Grid item xs={12}>
              {data?<></>:false}
            </Grid>
          </Grid>
}
export default App
