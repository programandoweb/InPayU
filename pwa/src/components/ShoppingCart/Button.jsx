import React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import StateContext from '../../helpers/ContextState';

let context     =   false


const App=({data,label,fullWidth,variant,ico})=>{

  context                     =   React.useContext(StateContext);
  const[disabled,setDisabled] =   React.useState(false);

  const handleAddShoppingCart=()=>{
    const insert  =   {
      slug:data.slug,
      price:data.price,
      offer:data.offer,
      label:data.label,
      summary:data.summary,
    }

    let shoppingCart

    if (context.shoppingCart) {
      shoppingCart    =   [...context.shoppingCart]
    }else {
      shoppingCart    =   []
    }
    if (!verificar()) {
      shoppingCart.push(insert)
      context.setShoppingCart(shoppingCart)
      setDisabled(true)
    }
  }

  const verificar=()=>{
    if (!data || !data.slug || !context.shoppingCart) {
      return false
    }
    const result        =  context.shoppingCart.find(search=>search.slug===data.slug)
    if (result) {
      return true
    }else {
      return false
    }
  }

  React.useEffect(()=>{
    if (verificar()) {
      setDisabled(true)
    }
  },[])

  return  <>{ data&&
              data.slug?<>
                <Button fullWidth={fullWidth||false}
                        disabled={disabled}
                        variant={variant||"contained"}
                        color="primary"
                        onClick={handleAddShoppingCart}>
                  {ico?<CurrencyExchangeIcon sx={{mr:1}}/>:<AddShoppingCartIcon sx={{mr:1}}/>}
                  {label||"Agregar al carrito"}
                </Button>
              </>:false
            }</>
}
export default App
