import React from 'react';
import Grid from '@mui/material/Grid';
import StateContext from '../../helpers/ContextState';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import useForms from '../../helpers/useForms';
import Input from '../../components/Input';
import SaveIcon from '@mui/icons-material/Save';

let getInit=false
const limit = 200



const App=({id,data})=>{

  const context               =   React.useContext(StateContext);
  const [items, setItems]     =   React.useState([...data]);
  const [inputs2, setInputs2] =   React.useState({});

  const {
          inputs,
          onChange
        }     =   useForms();

  const handleCapture = (e) => {
    if (e.files) {
      if (e.files.length !== 0) {
        // if (e.files[0].size>=limit) {
        //   context.setModalShow({
        //                   show:true,
        //                   message:  <div>
        //                                 Imagen supera límite permitido de ({limit/1000000}) MB
        //                                 <Button fullWidth
        //                                         variant="contained"
        //                                         sx={{ mt: 3, mb: 2 }}
        //                                         onClick={()=>context.setModalShow(false)}>Reintentar con otra</Button>
        //                             </div>,
        //                   size:""
        //                 }
        //               )
        // }
        // context.setModalShow({
        //                 show:true,
        //                 title:"Atención",
        //                 message:<Grid align="center">Cargando imagen al sistema</Grid>,
        //                 size:""
        //               }
        //             )
        const uri     =   "api/v1/dashboard/productos/productos/uploadfile";
        context.post(uri,{images:e.files[0],id:id},false,false).then((response)=>{
          if (response.data) {
            setItems(response.data)
            //context.setModalShow({show:false})
          }
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

  const handleDelete=(row)=>{
    context.post(false,{multimediaDelete:true,...row},false,false).then((response)=>{
      if (response.data) {
        setItems(response.data)
      }
    })
  }

  const onChangeText=(e,row)=>{
    let send                =   row
        send[e.target.name] =   e.target.value;
        setInputs2({...inputs2,send})

  }

  const onSubmit=()=>{
    const uri     =   "api/v1/dashboard/productos/productos/editfile";
    context.post(uri,{...inputs2},false,false).then((response)=>{
      if (response.data) {
        //setItems(response.data)
        //context.setModalShow({show:false})
      }
    })
  }

  return  <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid className="cam-content cursor-pointer" align="center">
                <input  accept='image/*'
                id='icon-button-file'
                type='file'
                capture='environment'
                onChange={(e) => handleCapture(e.target)}/>
                <AddPhotoAlternateIcon sx={{fontSize:50}}/>
              </Grid>
            </Grid>
            {items.map((row,key)=>{
              return  <Grid item xs={12} md={3} key={key} className="img-content" sx={{mb:5}}>
                        <CardMedia component="img" src={row.fullpath} sx={{height:"100%"}}/>
                        <Grid className="img-content-description">
                          <Grid sx={{mb:2}}>
                          <Input required
                                  size="small"
                                  fullWidth
                                  type="text"
                                  label="Título"
                                  defaultValue={row}
                                  name="label"
                                  onChange={(e)=>onChangeText(e,row)}/>
                          </Grid>

                          <Input required
                                  size="small"
                                  fullWidth
                                  type="text"
                                  label="Descripción"
                                  defaultValue={row}
                                  name="summary"
                                  onChange={(e)=>onChangeText(e,row)}/>
                          <Grid align="center" sx={{mt:2}}>
                            <Button color="purple" variant="contained"  onClick={onSubmit}>
                              <SaveIcon/>
                            </Button>
                          </Grid>
                        </Grid>
                        <Grid align="center">
                          <DeleteIcon className="cursor-pointer" onClick={()=>handleDelete(row)}/>
                        </Grid>
                      </Grid>
            })}
          </Grid>
}

export default App
