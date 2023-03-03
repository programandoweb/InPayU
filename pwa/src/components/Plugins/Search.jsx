import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Grid from '@mui/material/Grid';
const App=()=>{
  const [inputs,setInputs]    = React.useState({})
  const handleChange=(e)=>{
    setInputs({[e.target.name]:e.target.value})
  }
  return  <Grid className="plugins plugins-search">
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Buscar artículos
              </InputLabel>
              <OutlinedInput
                              id="q"
                              name="q"
                              fullWidth
                              type={'text'}
                              value={inputs.q}
                              onChange={()=>handleChange('password')}
                              startAdornment={
                              <InputAdornment position="start">
                                <IconButton
                                  aria-label="toggle password visibility"
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
