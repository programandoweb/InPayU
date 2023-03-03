import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
//import StateContext from '../../helpers/ContextState';

import Grid from '@mui/material/Grid';

const App=()=>{
  //context                     =  React.useContext(StateContext);
  const [inputs,setInputs]    = React.useState({})
  const handleChange=(e)=>{
    setInputs({[e.target.name]:e.target.value})
  }
  return  <Grid className="plugins plugins-search">
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                {"Buscar..."}
              </InputLabel>
              <OutlinedInput
                              id="q"
                              name="q"
                              fullWidth
                              type={'text'}
                              value={inputs.q}
                              onChange={()=>handleChange('password')}
                              endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="¿Qué quieres aprender hoy?"
                                  edge="end">
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"/>
              </FormControl>
          </Grid>
}

export default App
