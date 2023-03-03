import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import StateContext from '../../../helpers/ContextState';
import {format} from '../../../helpers/functions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {useStore} from '../../../helpers/useStore';
import { NavLink } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableFooter from '@mui/material/TableFooter';


let context     =   false
let store       =   false

const App=()=>{

  context                     =   React.useContext(StateContext);
  store                       =   useStore();
  const [sum,setSum]          =   React.useState(0)
  const [data,setData]        =   React.useState([])

  React.useEffect(() => {
    if (context.shoppingCart.length===0 || sum>0) {
      return
    }
    let sum_    =   0;
    let data_   =   [];
    if (!context.shoppingCart) {
      setSum(0)
      setData([])
    }else {
      context.shoppingCart.map((row,key)=>{
        sum_+=parseFloat(row.offer||row.price)
        return data_.push(row)
      })
      setSum(sum_)
      setData(data_)
    }

  }, [context.shoppingCart]);

  const handleClearShoppingCart=()=>{
    store.set("shoppingCart",[])
    setData([])
    setSum(0)
    context.setShoppingCart(false)
  }

  return  <Grid container justifyContent="center"  alignItems="center" spacing="2">
            <Grid item xs={11} md={10} align="center" sx={{mb:{xs:5,md:3}}}>
              <Paper sx={{p:2}}>
                <Alert severity="success" sx={{mb:3}}>
                  Nuestras transacciones están seguras, utilizamos métodos de cifrado robusto, nos apoyamos en las capas de seguridad de nuestra psarela de pago.
                </Alert>

                {
                  data.length>0?<>
                    <Grid align="right" sx={{mb:2}}>
                      <Button variant={"contained"} color="primary" onClick={handleClearShoppingCart}>
                          <DeleteIcon sx={{mr:1}}/> Vaciar carrito de compra
                      </Button>
                    </Grid>
                  </>:false
                }

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Artículo</TableCell>
                        <TableCell align="right">Descripción</TableCell>
                        <TableCell align="right">Precio</TableCell>
                        <TableCell align="right">Oferta</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.length>0?<>
                          {data.map((row,key) => (
                            <TableRow key={key}>
                              <TableCell component="th" scope="row">
                                {row.label}
                              </TableCell>
                              <TableCell align="right">{row.summary}</TableCell>
                              <TableCell align="right">{format(row.price)}</TableCell>
                              <TableCell align="right">{format(row.offer)}</TableCell>
                              <TableCell align="right">{format(row.offer || row.price)}</TableCell>
                            </TableRow>
                          ))}
                        </>:<>
                          <TableRow >
                            <TableCell colSpan="5">
                              <Grid align="center">
                                No hay artículos en su carro de compras, pero puedes ver cosas interesantes haciendo click <NavLink to="/"><b>aquí</b></NavLink>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </>
                      }

                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"><b>Total</b></TableCell>
                        <TableCell align="right">{format(sum)}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
}
export default App
