import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import Carousel from '../../../components/Carousel';
import ReactHtmlParser from 'react-html-parser';
import Typography from '@mui/material/Typography';


let getInit

const App=()=>{
  const [data,setData]          =   React.useState({data:[],links:[]})
  const [carousel,setCarousel]  =   React.useState([])
  const context                 =   React.useContext(StateContext);
  const [loading, setLoading]   =   React.useState(false);

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
  }, [context.lang]);

  return  <Grid container justifyContent="center"  alignItems="center" spacing="2">
            {
              !loading?<>
                <Carousel data={carousel}/>
                <Grid item xs={11} md={8}>
                  <Typography component="div" className="t-12">
                    { ReactHtmlParser(data.content) }
                  </Typography>
                </Grid>
              </>:false
            }
          </Grid>
}
export default App
