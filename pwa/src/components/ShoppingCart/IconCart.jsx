import React from 'react';
import StateContext from '../../helpers/ContextState';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { NavLink } from "react-router-dom";

let context     =   false

const App=()=>{
  context                     =   React.useContext(StateContext);

  // React.useEffect(()=>{
  //   console.log(context.shoppingCart);
  // },[context.shoppingCart])

  return  <NavLink to="/shoppingCart/toPay">
            {
              context.shoppingCart.length>0?<>
                  <Badge badgeContent={context.shoppingCart.length} color="primary">
                    <ShoppingCartIcon color="action" />
                  </Badge>
                </>:<>
                <ShoppingCartIcon/>
              </>
            }
          </NavLink>


}
export default App
