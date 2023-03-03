import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import StateContext from '../../helpers/ContextState';
import Badge from '@mui/material/Badge';

let getInit=false
let context=false

const App=()=>{
  context                     =  React.useContext(StateContext);
  const [data,setData]        =  React.useState(false)

  getInit=(mounted)=>{
    if (!context.user) {
      return false;
    }
    context.get('api/admin/notifications',{...context.user},false,false).then((response)=>{
      if (response && response.data) {
        setData(response.data)
      }
    })
  }

  React.useEffect(()=>{
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  },[])

  return  <>
            {context.user?<MenuItem to="/academies" component={Link} ><SchoolIcon/></MenuItem>:false}
            <MenuItem to="/ToPay" component={Link}>
              {
                context.shoppingCart.length>0?<>
                  <Badge badgeContent={context.shoppingCart.length} color="primary">
                    <ShoppingCartIcon/>
                  </Badge>
                </>:<>
                  <ShoppingCartIcon/>
                </>
              }

            </MenuItem>
            {context.user?<MenuItem to="/dashboard/notifications" component={Link}>
              <Badge badgeContent={data.count} color="primary">
                <NotificationsIcon/>
              </Badge>
            </MenuItem>:false}
          </>
}

export default App
