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

const Group4=({loading,inputs})=>{
  return  <Paper sx={{mt:2}}>
            <Multimedia id={inputs.id} data={inputs.multimedia||[]}/>
          </Paper>
}

const Group3=({loading,inputs,setState})=>{
  return  <Paper sx={{mt:2}}>
            <Textarea loading={loading} name="description" inputs={inputs} onChange={setState}/>
          </Paper>
}

const Group2=({loading,inputs,onChange})=>{
  return  <Paper sx={{mt:2,p:5}}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} className="characteristics" sx={{mb:3}}>
                <ProductsCharacteristics name="Medidas" id={inputs.id} data={inputs.characteristics||[]}/>
              </Grid>
              <Grid item xs={12} md={12} className="characteristics" sx={{mb:3}}>
                <ProductsCharacteristics name="Incluye" id={inputs.id} data={inputs.incluye||[]}/>
              </Grid>
              <Grid item xs={12} md={12} className="characteristics" sx={{mb:3}}>
                <ProductsCharacteristics name="Ficha" id={inputs.id} data={inputs.ficha||[]}/>
              </Grid>
              <Grid item xs={12} md={12} className="characteristics" sx={{mb:3}}>
                <ProductsCharacteristics name="Envio" id={inputs.id} data={inputs.envio||[]}/>
              </Grid>
            </Grid>
          </Paper>
}

const Group1=({loading,inputs,onChange,categorias})=>{
  return <Paper sx={{mt:2}}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Input required
                      fullWidth
                      loading={loading}
                      type="text"
                      label="Nombre del producto"
                      defaultValue={inputs }
                      name="label"
                      onChange={onChange}/>
            </Grid>
            <Grid item xs={12} md={3}>
              <Select data={categorias||[]}
                            loading={loading}
                            fullWidth
                            name="categoria_id"
                            byId={"value"}
                            defaultValue={inputs.categoria_id}
                            placeholder={"Categoría"}
                            inputs={inputs}
                            setInputs={onChange}
                            label={"Categoría"}
                        />
            </Grid>
            <Grid item xs={12} md={2}>
              <Input  disabled
                      loading={loading}
                      fullWidth
                      type="text"
                      label="Slug"
                      defaultValue={inputs }
                      name="slug"
                      onChange={onChange}/>
            </Grid>
            <Grid item xs={12} md={2}>
              <Input  fullWidth
                      loading={loading}
                      type="number"
                      label="Precio"
                      defaultValue={inputs }
                      name="price"
                      onChange={onChange}/>
            </Grid>
            <Grid item xs={12} md={2}>
              <Input
                      fullWidth
                      loading={loading}
                      label="Oferta"
                      defaultValue={inputs }
                      name="offer"
                      onChange={onChange}/>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mt:2}}>
            <Grid item xs={12}>
              <TextareaSimple name="summary"
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
  const [loading,setLoading]              =   React.useState(true)
  const [value_externo,setValue_externo]  =   React.useState(0)

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

    let send  =   {}

    Object.entries(inputs).map((row,key)=>{
      if (!Array.isArray(row[1])) {
        return send[row[0]] = row[1]
      }
    })
    //  return console.log(send);
    context.post(false,{...send},false,false).then((response)=>{
      context.setSnackbars(
                            {
                              message:response.message,
                              color:""
                            }
                          )

      if (value_externo<3) {
        setValue_externo(value_externo<3?(value_externo+1):false)
      }else {
        return navigate(-1);
      }
      return navigate("/dashboard/productos/productos/list/"+response.data.id);
    })
  }

  //console.log(inputs);


  return  <form onSubmit={onSubmit}>
            <Tabs inputs={inputs}
                  value_externo={value_externo}
                  components={
                              [
                                {
                                  component:<Group1 loading={loading} inputs={inputs} onChange={onChange} categorias={categorias}/>,
                                  label:"Básico"
                                },
                                {
                                  component:<Group3 loading={loading} inputs={inputs} setState={setState}/>,
                                  label:"Descripción"
                                },
                                {
                                  component:<Group2 loading={loading} inputs={inputs} setState={setState}/>,
                                  label:"Características"
                                },
                                {
                                  component:<Group4 loading={loading} inputs={inputs} setState={setState}/>,
                                  label:"Multimedia"
                                },
                              ]
                            }
            />


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
