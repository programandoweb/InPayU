import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Textarea from '../../../../components/TextareaCustom';
import TextareaSimple from '../../../../components/TextareaSimple';
import useForms from '../../../../helpers/useForms';
import StateContext from '../../../../helpers/ContextState';
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Multimedia from '../../../../components/Multimedia/Productos';
import Tabs from '../../../../components/Tabs/Productos';
import ProductsCharacteristics from '../../../../components/Products/ProductsCharacteristics';

let getInit



const Group1=({loading,inputs,onChange,categorias})=>{
  return <Paper sx={{mt:2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Input required
                      fullWidth
                      loading={loading}
                      type="text"
                      label="Nombre de la categoría para productos"
                      defaultValue={inputs }
                      name="label"
                      onChange={onChange}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Input  disabled
                      loading={loading}
                      fullWidth
                      type="text"
                      label="Slug"
                      defaultValue={inputs }
                      name="slug"
                      onChange={onChange}/>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12}>
              <TextareaSimple name="descripcion"
                              inputs={inputs}
                              onChange={onChange}
                              placeholder={"Resumen SEO"}
              />
            </Grid>
          </Grid>
        </Paper>
}

const App=()=>{
  const navigate                      =   useNavigate();
  const location                      =   useLocation();
  const context                       =   React.useContext(StateContext);
  const [categorias,setCategorias]    =   React.useState([])
  const [loading,setLoading]          =   React.useState(true)

  const [ inputs,
          onChange,
          setState,
          setInputs,
          overWriteState]     =   useForms();

  getInit=(mounted,filter)=>{
    context.get(false,{},false,false).then((response)=>{
      if (response&&response.data) {
        setInputs(response.data)
      }
      setLoading(false)
    })
  }

  React.useEffect(()=>{
    if (context.system && context.system.categorias) {
      setCategorias(context.system.categorias)
    }
  },[context.system])


  React.useEffect(() => {
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, [location.pathname]);

  const onSubmit=(e)=>{
    e.preventDefault()
    context.post(false,{...inputs},false,false).then((response)=>{
      context.setSnackbars(
                            {
                              message:response.message,
                              color:""
                            }
                          )
      return navigate(-1);
    })
  }



  return  <form onSubmit={onSubmit}>

            <Group1 loading={loading} inputs={inputs} onChange={onChange} categorias={categorias}/>
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
            {
              inputs && inputs.categoria_id ?<>
                <Button   sx={{mt:2}}
                          color={"secondary"}
                          variant="contained"
                          href={"../../../../categorias/"+categorias.find(search=>search.id===inputs.categoria_id).slug+"/"+inputs.slug}
                          target="_blank">
                  Previsualizar
                </Button>
              </>:false
            }
        </form>
}
export default App
