import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import StateContext from '../../helpers/ContextState';



// const test  =   [
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                   {
//                     title:"Prueba de notificación",
//                     url:"#",
//                     comment:"Hola prueba de comentario debajo"
//                   },
//                 ]

const prefijo           =   process.env.REACT_APP_PREFIJOADMIN
let getInit

const App=()=>{

  const context           =   React.useContext(StateContext);
  const user              =   context.user
  const [anchorElUserNotify, setAnchorElUserNotity]   =   React.useState(null);
  const [data, setData]   =   React.useState([]);

  const handleOpenUserMenuNotify = (event) => {
    setAnchorElUserNotity(event.currentTarget);
  };

  const handleCloseUserMenuNotify = (row) => {
    setAnchorElUserNotity(null);
  };

  getInit=()=>{
    context.get("api/admin/notifications",{},false,false).then((response)=>{
      if (response &&response.data && response.data.items) {
        setData(response.data.items)
      }
    })
  }

  React.useEffect(()=>{
    if (context && context.socket) {
      context.socket.on('notifications', function (data) {
        getInit()
      })
    }
  },[context]);

  React.useEffect(()=>{
    getInit()
  },[]);


  return  <>
            <Tooltip title="Notificaciones">
              <IconButton onClick={handleOpenUserMenuNotify} sx={{ p: 0 , mr:2}}>
                <NotificationsIcon className="text-white"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUserNotify}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUserNotify)}
              onClose={handleCloseUserMenuNotify}
            >
                {data.map((setting,key) =>{
                    return <MenuItem  key={key}
                                      component={Link}
                                      to={prefijo+setting.url}
                                      onClick={()=>handleCloseUserMenuNotify(setting)}>
                                      <Grid sx={{ flexGrow: 1, pr:3,  pl:1 }} container spacing={4}>
                                        <Grid item xs={2}>
                                          <Avatar alt={user.name} src={setting.transmitter&&setting.transmitter.avatar_fullurl&&!setting.transmitter.avatar_fullurl.includes("null")?setting.transmitter.avatar_fullurl:"https://www.sanboni.edu.co/onu/wp-content/uploads/avatar-mujer.png"} />
                                        </Grid>
                                        <Grid item xs={10}>
                                          <Typography className="notify-title">{setting.title}</Typography>
                                          <Typography className="notify-message">{setting.comment}</Typography>
                                          <Typography className="notify-transmitter">{setting.transmitter && setting.transmitter.name?setting.transmitter.name+" "+setting.transmitter.surnames:""}</Typography>
                                        </Grid>
                                      </Grid>
                          </MenuItem>

                  }
                )}
            </Menu>
          </>
}
export default App
