import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import StateContext from '../../helpers/ContextState';
import { Link } from "react-router-dom";

const App=({params})=>{
  const [items,setItems]  =   React.useState([])
  const context           =   React.useContext(StateContext);

  React.useEffect(()=>{
    // if (context.system && context.system.categorias && (params && params.system)) {
    //   setItems(context.system[params.system])
    // }
  },[])

  return  <>
            {items.map((row,key)=>{
              return  <MenuItem key={key}
                                component={Link}
                                to={(row.params && row.params.slug?row.params.slug:"/categorias/")+row.slug}
                                >
                        {row.label}
                      </MenuItem>
            })}
          </>
}

export default App
