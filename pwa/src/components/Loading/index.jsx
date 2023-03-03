import React from 'react';
import {useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoopIcon from '@mui/icons-material/Loop';
import LinearProgress from '@mui/material/LinearProgress';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  textAlign:"center"
};

const style2 = {
  zIndex:1000,
  position: 'absolute',
  top: '0%',
  left: '0%',
  width: '100%',
};

let defaultTime=3000

const Loading=({loading,setLoading,height,label})=>{

  useEffect(()=>{
    if (loading) {
      setTimeout(function(){
        setLoading(false)
      },defaultTime);
    }
  },[loading,setLoading])

  return  <Grid container component="main" sx={{ height:height?height:'100vh' }}>
            <Box sx={style2}>
              <LinearProgress color="secondary" />
            </Box>
            <Box sx={style}>
              <LoopIcon className="spin" fontSize={"large"} color="primary"/>
              <Typography variant="h5">{label?label:"Cargando..."}</Typography>
            </Box>
          </Grid>
}

export default Loading
