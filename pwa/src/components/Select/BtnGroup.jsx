import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StateContext from '../../helpers/ContextState';

let getInit
const items   =   [
  {
    label:"Pendiente",
    value:1,
    id:7
  },
  {
    label:"Aprobado",
    value:2,
    id:8
  },
  // {
  //   label:"Pendiente",
  //   value:4,
  // },
  {
    label:"Rechazado",
    value:9000,
    id:12
  },
  {
    label:"Inactivo",
    value:9,
    id:11
  }
]

export default function BasicButtonGroup({name,inputs,setInputs,defaultValue,disabled,title,endpoint}) {
  const [active,setActive]  =   React.useState(defaultValue||7)
  const handleOnClick=(row)=>{
    setActive(row.id)
    submit(row.value)
  }
  const context             =   React.useContext(StateContext);

  const submit=(value)=>{
    if (endpoint) {
      context.post(endpoint,{value:value},false,false).then((response)=>{
        if (response&&response.data) {
          //setData(response.data)
        }
      })
    }
  }
  return (
    <>
      {title?<Typography component="h3" className="title-course-main">
        <b>
          {
            title
          }
        </b>
      </Typography>:false}

        <ButtonGroup aria-label="outlined primary button group">
          {items.map((row,key)=>{
            return    <Button key={key} color="primary" variant={active===row.id?"contained":"outlined"} onClick={()=>handleOnClick(row)}>
                        {row.label}
                      </Button>
          })}
        </ButtonGroup>

    </>
  );
}
