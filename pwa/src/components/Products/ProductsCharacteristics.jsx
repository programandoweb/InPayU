import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StateContext from '../../helpers/ContextState';
//import DeleteIcon from '@mui/icons-material/Delete';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const App=({name,id,label,data})=>{

  const context             =   React.useContext(StateContext);
  const [inputs,setInputs]  =   React.useState({})
  const [items,setItems]    =   React.useState([...data])

  const onChange=(e)=>{
    setInputs({...inputs,[e.target.name] : e.target.value})
  }

  const onClick=()=>{
    context.post(false,{...inputs,characteristics:true,name:name},false,false).then((response)=>{
      if (response && response.data) {
        setItems(response.data)
      }
    })
  }

  const handleDelete = (row) => {
    context.post(false,{characteristicsDelete:true,...row},false,false).then((response)=>{
      if (response && response.data) {
        setItems(response.data)
      }
    })
  };



  return      <>
                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    {name}
                  </InputLabel>
                  <OutlinedInput
                    type={'text'}
                    value={inputs.q}
                    onChange={(e)=>onChange(e)}
                    label={name}
                    fullWidth
                    name={name}
                    endAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          onClick={onClick}
                          aria-label="toggle password visibility"
                          edge="end">
                          <AddCircleIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Stack direction="row" spacing={1}>
                  {items.map((row,key)=>{
                    return  <Chip label={row.valor} variant="outlined" onDelete={()=>{handleDelete(row)}}  key={key}/>
                  })}
                </Stack>
              </>

}
export default App
