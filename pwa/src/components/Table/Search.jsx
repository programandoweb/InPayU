import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

let id      = (Math.random() + 1).toString(36).substring(7);
let filter  = ""
let send    = false
const App   = ({sx,placeHolder,name,getInit,loading,add})=>{

  const [desactivarInput, setDesactivarInput]   = React.useState(false);

  React.useEffect(()=>{
    setDesactivarInput(false)

    document.onkeydown = function(evt) { evt = evt || window.event; if (evt.keyCode === 27) {
        document.getElementById(id).value=""
        filter  =   ""
        send()
        setDesactivarInput(false)
    }};
  },[])

  const handleChange=(e)=>{
    filter    =  e.target.value
  }
  const handleMouseDownPassword=()=>{
    if (!filter) {
      return false;
    }
    if (!desactivarInput) {
      setDesactivarInput(true);
      send()
    }else {
      document.getElementById(id).value=""
      setDesactivarInput(false);
      filter  =   ""
      send()
    }
  }
  const onKeyPress=(e)=>{
    if (e.key === "Enter") {
      e.preventDefault()
      send()
      setDesactivarInput(true);
    }
  }
  send=()=>{
    getInit(true,filter)
  }

  return  <FormControl sx={sx ||  { mb: 2, mt: 0, width: '100%' }} variant="outlined" color="gray">
            <InputLabel color="gray" htmlFor="outlined-adornment-password">{placeHolder}</InputLabel>
            <OutlinedInput  id={id}
                            type={'text'}
                            name={name}
                            size="small"
                            autoComplete={"true"}
                            disabled={desactivarInput}
                            onKeyPress={onKeyPress}
                            onChange={handleChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility"
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                  {desactivarInput?<CancelIcon/>:<SearchIcon />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label={placeHolder}/>
          </FormControl>
}

export default App
