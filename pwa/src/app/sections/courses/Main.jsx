import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ListUl from '../../../components/ListUl';
import ReactHtmlParser from 'react-html-parser';
import FormShoppingCart from '../../../components/FormShoppingCart';
import Faq from '../../../components/Faq';

let getInit

const App=()=>{
  const [data,setData]        =   React.useState(false)
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
            {data?<>
              {
                !loading && (data && data.content_open && data.content_open.video_fullurl)?<Grid item xs={12} md={5}>
                  <video controls autoPlay style={{maxWidth:"100%",minWidth:"100%"}}>
                    <source src={data.content_open.video_fullurl} type="video/mp4"/>
                  </video>
                </Grid>:!loading && (data && data.content_open && data.content_open.image_fullurl)?<Grid item xs={12} md={5}>

                </Grid>:<Grid item xs={12} md={5}></Grid>
              }
              <Grid item xs={12} md={7} sx={{pt:{xs:1,md:2},pl:3,pr:3}}>
                <Typography component="h1" className="title-course-main">
                  <b>{data.label}</b>
                </Typography>
                <Grid sx={{mb:2}}>
                  <Typography component="p" className="title-course-p">
                    {data.content_open.summary}
                  </Typography>
                </Grid>
                <Grid container>
                  <Grid item xs={2} md={2}>
                    <Grid className="circle"></Grid>
                  </Grid>
                  <Grid item  xs={10} md={10}>
                    <Grid className="vertical-center-container">
                      <Grid className="vertical-center t-12">
                        <Grid>
                          <b>Lorem ipsum dolor sit amet</b>
                        </Grid>
                        <Grid className="">
                          consectetuer adipiscing elit
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {data.extra && data.extra!==""?<Grid item xs={10} sx={{pt:6}}>
                <Alert severity="warning">
                  {data.extra}
                </Alert>
              </Grid>:false}
              <Grid item xs={12} sx={{pt:6}}>
                <Grid container justifyContent="center" spacing={10}>
                  <Grid item xs={10} md={5}>
                    <Typography component="h2" className="title-course-secondary">
                      ¿Qué aprenderás en este curso?
                    </Typography>
                    <Grid>
                      <ListUl data={data.items_learning_type1}/>
                    </Grid>
                    <Typography component="h2" className="title-course-secondary">
                      Descripción
                    </Typography>
                    <Grid>
                      { ReactHtmlParser(data.content_open.content || data.content_open.summary) }
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <FormShoppingCart data={data} reference={"courses/id/"+data.id}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{p:6}} className="bg-primary">
                <Typography component="h2" className="title-course-footer text-center text-white mb-2">
                  ¿Qué aprenderás en este curso?
                </Typography>
                <Grid container justifyContent="center" spacing={10}>
                  <Grid item xs={10}>
                    <Faq data={data.items_learning_type2} className="UlLI-content-white"/>
                  </Grid>
                </Grid>
              </Grid>
            </>:false}
          </Grid>
}
export default App
