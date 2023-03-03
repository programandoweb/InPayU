import * as React from 'react';
import {useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import StateContext from '../../helpers/ContextState';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';

export default function SelectLabels({m,data,name,label,inputs,setInputs,placeholder,required,defaultValue,byId,children,disabled,loading}) {

  const context                 =   React.useContext(StateContext);
  const [age, setAge]           =   React.useState(false);
  const [reset, setReset]       =   useState(false)

  const handleChange = (event: SelectChangeEvent) => {
    setInputs(event)
    setAge(event.target.value);
  };


  useEffect(()=>{
    if (defaultValue && !age) {
      setReset(true)
    }
    setAge(defaultValue)
  },[defaultValue])

  useEffect(()=>{
    if (reset) {
      setReset(false)
    }
  },[reset])

  const onChange=(e)=>{
    if (children) {
      context.post("api/"+children.url,{id:e.target.value},false,false).then((response)=>{
        if (response.data) {
          let inputs_         =   {...children.input}
              inputs_         =   response.data
              children.setInput(inputs_)
        }
      })
    }
  }

  return (  <>
              {loading?<Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:6,md:55}}}/>:<>
                  {data && data.length && !reset>0?<>
                    <FormControl sx={{ minWidth: "100%" }} disabled={disabled}>
                      <InputLabel id="demo-simple-select-helper-label" sx={{m:m}}>
                        {label}
                      </InputLabel>
                      <Select
                        sx={{m:m||0}}
                        required={required}
                        name={name}
                        labelId="demo-simple-select-helper-label"
                        id={name}
                        value={age?age:""}
                        label={label}
                        onChange={(e)=>{handleChange(e)}}
                      >
                        <MenuItem value="">
                          <em>{placeholder}</em>
                        </MenuItem>
                        {data.map((row,key)=>{
                          return <MenuItem key={key} value={row.id}>{row.label||row.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </>:<Typography variant="h6" ><Grid>No data in select</Grid></Typography>}
              </>}
            </>
        );
}
