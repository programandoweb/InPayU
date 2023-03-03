import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import ReactHtmlParser from 'react-html-parser';
let getInit=false
const App=()=>{

  const context               =   React.useContext(StateContext);
  const [data, setData]       =   React.useState({scrap:[],html:""});
  const [ocultar, setOcultar] =   React.useState([]);
  getInit=(mounted)=>{
    context.get(false,{...context.user},false,false).then((response)=>{
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

  const handleClick=(row,key)=>{
    let ocultar_=[...ocultar]
        ocultar_.push(key)
    setOcultar(ocultar_)
  }

  return  <Grid container>
            <Grid item xs={6}>
              {
                data.scrap.map((row,key)=>{
                  const result  =  ocultar.find(search=>search===key)
                  if (result!==undefined) {
                    return false
                  }
                  return <Grid className="bg-white" sx={{p:3,mb:3}} key={key}>
                            <Grid className="bg-primary text-white" onClick={()=>handleClick(row,key)} sx={{mb:2,p:2}}>
                              Quitar
                            </Grid>
                            <Grid className="bg-primary text-white " onClick={()=>setOcultar([])} sx={{mb:2,p:2}}>
                              Restaurar
                            </Grid>
                            {ReactHtmlParser(row)}
                          </Grid>
                })
              }
            </Grid>

            <Grid item xs={6}>
              {ReactHtmlParser(data.html)}
            </Grid>

          </Grid>
}
export default App
