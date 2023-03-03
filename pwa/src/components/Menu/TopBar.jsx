import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StateContext from '../../helpers/ContextState';
import {useStore} from '../../helpers/useStore';
import { useNavigate } from "react-router-dom";

const App=({title})=>{
  const navigate                        =   useNavigate();
  const [anchorElUser, setAnchorElUser] =   React.useState(null);
  const context                         =   React.useContext(StateContext);
  const store                           =   useStore();
  const handleOpenUserMenu              =   (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleExit=()=>{
    if (context.user) {
      context.post("api/v1/auth/exit",{...context.user},false,false).then((response)=>{
        context.setUser(false)
        store.clear()
        return navigate("/auth/login");
      });
    }
  }

  return  <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="gray2" enableColorOnDark>
              <Toolbar>
                <Box sx={{  color:"#aaa", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <b>{title}</b>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Typography component="span"  className=" cursor-pointer " onClick={handleExit}>
                    Cerrar sesión <ExitToAppIcon sx={{ml:1}}/>
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
}
export default App
