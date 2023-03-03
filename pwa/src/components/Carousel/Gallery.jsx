import React from 'react';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ReactHtmlParser from 'react-html-parser';
import './css.css';
const App=({data})=>{
  const [image,setImage]          =   React.useState(false);
  const [select,setSelect]        =   React.useState(0);
  const [transition,setTransiion] =   React.useState("fadeIn");

  React.useEffect(()=>{
    if(data[0] && data[0].fullpath && !image){
      setImage(data[0])
    }
  },[data,image])

  // React.useEffect(()=>{
  //   if(transition==='fadeOut'){
  //     setTimeout(setTransiion("fadeIn"),10000)
  //   }
  // },[transition])

  const handleClick=(row,key)=>{
    if (transition==='fadeOut' || select===key) {
      return false
    }
    setSelect(key)
    setTransiion("fadeOut")
    setTimeout(()=>{
      setTransiion("fadeIn")
      setImage(row)
    },800)
  }


  return  <Grid className="gallery">
            {
              data.length>0?<>
                <Grid className="items" >
                  {data.map((row,key)=>{
                    return    <Grid className={select===key?"item active":"item"} key={key} onClick={()=>handleClick(row,key)}>
                                  <CardMedia
                                              sx={{ height: "100%", }}
                                              image={row.fullpath}
                                              title={row.label}

                                  />
                              </Grid>

                  })}
                </Grid>
              </>:false
            }
            <Grid className="big">
              {
                image.fullpath?<>
                  <Grid className="zoom-gallery-content">
                    <Grid className="zoom">
                      <CardMedia
                                  className={transition}
                                  sx={{ height: "100%", }}
                                  image={image.fullpath}
                                  title={image.label}

                      />
                    </Grid>
                  </Grid>
                </>:  <Grid>
                        Cargando...
                      </Grid>
              }
            </Grid>
            <Grid className="summary">
              <Typography component="div">
                <b>{ ReactHtmlParser(image.summary) }</b>
              </Typography>
            </Grid>
          </Grid>
}
export default App
