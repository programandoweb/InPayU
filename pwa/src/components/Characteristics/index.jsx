import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './css.css';
const App=({data})=>{
  return <>
    {data.length>0?<>
      {data.map((row,key)=>{
        return  <Grid key={key} className="characteristics">
                    <Grid className="name text-color-secondary">
                      <Typography component="div">
                        <b>{row.name}</b>
                      </Typography>
                    </Grid>
                    <Grid className="valor">
                      <Grid className="flex">
                        {row.valor}
                      </Grid>
                    </Grid>
                </Grid>
      })}
    </>:false}
  </>
}
export default App
