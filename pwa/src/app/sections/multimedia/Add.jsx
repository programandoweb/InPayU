import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../../helpers/ContextState';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextareaSimple from '../../../components/TextareaSimple';
import Input from '../../../components/Input';
import useForms from '../../../helpers/useForms';
import { useLocation, useNavigate } from "react-router-dom";


let getInit=false
const limit = 20



const App=({id,name})=>{
  const navigate                      =   useNavigate();
  const location                      =   useLocation();
  //const [data,setData]        =   React.useState({slider:false,categories:false})
  const context               =   React.useContext(StateContext);
  const [img, setImg]         =   React.useState({});
  const [ inputs,
          onChange,
          setState,
          setInputs,
          overWriteState]     =   useForms();

  const handleCapture = (e) => {
    if (e.files) {
      if (e.files.length !== 0) {
        if (e.files[0].size>=limit) {
          context.setModalShow({
                          show:true,
                          message:  <div>
                                        Imagen supera límite permitido de ({limit/1000000}) MB
                                        <Button fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={()=>context.setModalShow(false)}>Reintentar con otra</Button>
                                    </div>,
                          size:""
                        }
                      )
        }
        context.setModalShow({
                        show:true,
                        title:"Atención",
                        message:<Grid align="center">Cargando imagen al sistema</Grid>,
                        size:""
                      }
                    )
        const uri     =   "api/multimedia/uploadfile";
        context.post(uri,{images:e.files[0],id:id,name:name},false,false).then((response)=>{
          //console.log(response.data);
          if (response.data) {
            setImg(response.data)
          }
          //context.setModalShow({show:false,})
        })
      }
    }
  };

  getInit=(mounted)=>{
    context.get('api/v1/freeZone/home',{...context.user},false,false).then((response)=>{
      if (response&&response.data) {
        //setData(response.data)
      }
    })
  }

  React.useEffect(() => {
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, [context.lang]);

  const onSubmit=(e)=>{
    e.preventDefault()
    context.post(false,{...inputs,img:JSON.stringify(img)},false,false).then((response)=>{
      context.setSnackbars(
                            {
                              message:response.message,
                              color:""
                            }
                          )
      //return navigate(-1);
    })
  }

  return  <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>

                  <Grid className="cam-content cursor-pointer" align="center">
                    <input  accept='image/*'
                    id='icon-button-file'
                    type='file'
                    capture='environment'
                    onChange={(e) => handleCapture(e.target)}/>
                    <AddPhotoAlternateIcon sx={{fontSize:50}}/>
                  </Grid>


                </Grid>
                {
                  img && img.src?  <>

                          <Grid item xs={12} md={3} >
                            <Input  fullWidth

                                    label="Título"
                                    defaultValue={inputs }
                                    name="name"
                                    onChange={onChange}/>
                          </Grid>
                          <Grid item xs={12} md={4} >
                            <CardMedia
                                        component="img"
                                        src={img.src}
                            />
                          </Grid>
                          <Grid item xs={12} md={12} >
                            <TextareaSimple name="description"
                                            inputs={inputs}
                                            onChange={onChange}
                                            placeholder={"Resumen SEO"}
                            />
                          </Grid>
                        </>:false
                }
                <Grid item xs={12} md={12} >
                  <Button
                    sx={{mt:2,mr:2}}
                    color={"purple"}
                    type="submit"
                    variant="contained">
                    {"Guardar Información"}
                  </Button>

                  <Button
                    sx={{mt:2,mr:2}}
                    color={"gray"}
                    onClick={()=>navigate(-1)}
                    variant="contained">
                    Volver
                  </Button>
                </Grid>

              </Grid>
        </form>
}

export default App
