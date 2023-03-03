import * as React from 'react';
import StateContext from '../../../helpers/ContextState';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";


let getInit
let context

const response_test =   {}


const App=()=>{

  const [data,setData]=React.useState([])
  const navigate         =   useNavigate();
  context =   React.useContext(StateContext);

  getInit=(mounted,filter)=>{
    context.get(false,{},false,false).then((response)=>{
      return navigate("/dashboard/scraping/categorias/result");
    })
  }


  React.useEffect(() => {
    let mounted =   true
    setData(response_test.data)
    //getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, []);


  return  <Grid onClick={()=>getInit(true)}>
            Comenzar
          </Grid>
}
export default App
