import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid({data}) {
  console.log(data);
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: "100%",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <ButtonBase sx={{ width: 320, height: 128 }}>
            <Img alt="Programandoweb" src={data.image_fullurl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle0" component="div">
                {data.updated_at_string}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {data.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
