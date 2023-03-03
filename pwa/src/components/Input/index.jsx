import * as React from 'react';
import {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
const App=({  onChange,
              label,
              loading,
              name,
              margin,
              type,
              autoFocus,
              fullWidth,
              required,
              autoComplete,
              color,
              size,
              multiline,
              rows,
              defaultValue,
              className,
              min,
              max,
              maxLength,
              onKeyPress,
              disabled,
              value})=>{

  const [reset, setReset]       = useState(false)

  // useEffect(()=>{
  //   setReset(true)
  // },[defaultValue])

  useEffect(()=>{
    if (reset) {
      setReset(false)
    }
  },[reset])

  return  <>
            {loading?<>
                <Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:6,md:55}}}/>
              </>:<>
                {!reset?<TextField
                          InputLabelProps={{ shrink: true }}
                          margin={margin}
                          required={required}
                          disabled={disabled}
                          fullWidth={fullWidth}
                          multiline={multiline}
                          defaultValue={defaultValue && defaultValue[name]?defaultValue[name]:""}
                          value={value}
                          className={className}
                          maxLength={maxLength}
                          min={min}
                          max={max}
                          size={size}
                          rows={rows}
                          type={type}
                          id={name}
                          label={label}
                          name={name}
                          autoComplete={autoComplete}
                          autoFocus={autoFocus}
                          onChange={onChange}
                          onKeyPress={onKeyPress}
                        />:false}
              </>
            }

          </>
}
export default App
