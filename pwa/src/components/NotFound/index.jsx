import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SmartToyIcon from '@mui/icons-material/SmartToy';


const App=()=>{
    return  <Grid component="main" sx={{ height:{xs:"80vh", md:'80vh'} }}>
              <Box sx={{
                            position: 'absolute',
                            top: {md:'40%',xs:'20%'},
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            textAlign:"center"
                        }}>
                <SmartToyIcon sx={{fontSize:{xs:40,md:220}}}  color="primary"/>
                <Typography variant="h1">
                  404
                </Typography>
                <Typography variant="h6">
                  [ No Existe ]
                </Typography>
              </Box>
            </Grid>
}
export default App
