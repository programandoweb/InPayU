import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const cantidad=[1,2,3,4,5,6]
export default function Variants() {

  return  <Grid container spacing={1}>
            {cantidad.map((row,key)=>{
                return <Grid item xs={12}   key={key} sx={{mb:2}}>
                          <Stack >
                            <Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:5,md:40}}}/>
                            <Skeleton variant="rectangular" width={"100%"} sx={{height:{xs:10,md:180},mt:1}}/>
                          </Stack>
                        </Grid>
            })}

          </Grid>

}
