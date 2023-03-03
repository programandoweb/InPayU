import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {modules,menu_user} from '../../helpers/modules';
import { Link } from "react-router-dom";
import ItemSubMenu from './ItemSubMenu';
import StateContext from '../../helpers/ContextState';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CardMedia from '@mui/material/CardMedia';
import image from '../../assets/images/logo.png';

import PropTypes from 'prop-types';

const position          =   "fixed"
//const prefijo           =   process.env.REACT_APP_PREFIJOADMIN


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const ResponsiveAppBar  =   (props) => {
  const [anchorElNav, setAnchorElNav]     =   React.useState(null);
  const [anchorElUser, setAnchorElUser]   =   React.useState(null);
  //const [navBackground, setNavBackground] =   React.useState(false)
  const context                           =   React.useContext(StateContext);
  const user                              =   context.user

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (row) => {

    seo(row)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (row) => {
    seo(row)
    setAnchorElUser(null);
  };

  const seo=(row)=>{
    document.title =  process.env.REACT_APP_NAME+" - "+row.name
  }

  return (
    <HideOnScroll {...props}>
      <AppBar position={position} color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MenuItem to="/"
                      className="text-white"
                      component={Link}
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                      }}>
              <CardMedia
                component="img"
                height="80"
                image={image}
                alt="Programandoweb"
              />

            </MenuItem>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {
                  modules.map((page,key) =>{
                    if ((page.items!==undefined && page.items.length===0) && page.menu && !page.plugins_mobile && !page.plugins) {
                        return  <MenuItem key={key}
                                            component={Link}
                                            to={page.slug}
                                            onClick={()=>handleCloseNavMenu(page)}>
                                  <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                    }else if ((page.items!==undefined && page.items.length>0) && page.menu) {
                      return <ItemSubMenu prefBool={true} page={page} handleCloseNavMenu={handleCloseNavMenu} label={page.name} data={page.items} key={key}/>
                    }else if (!page.menu && page.plugins_mobile && !page.sidebar) {
                      return  <MenuItem key={key}>
                                {<page.component/>}
                              </MenuItem>
                    }else {
                      return false
                    }
                  })
                }
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {process.env.REACT_APP_NAME}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                modules.map((page,key) =>{
                  if ((page.items!==undefined && page.items.length===0) && page.menu) {
                      return  <MenuItem key={key}
                                          component={Link}
                                          to={page.slug}
                                          onClick={()=>handleCloseNavMenu(page)}>
                                {page.Icon?<page.Icon></page.Icon>:false}
                                <Typography textAlign="center">{page.name}</Typography>
                              </MenuItem>
                  }else if ((page.items!==undefined && page.items.length>0) && page.menu) {
                    return <ItemSubMenu prefBool={true} page={page} handleCloseNavMenu={handleCloseNavMenu} label={page.name} data={page.items} key={key}/>
                  }else if (!page.menu && page.plugins && !page.sidebar) {
                    return  <React.Fragment key={key}>
                              {<page.component/>}
                            </React.Fragment>
                  }else {
                    return false
                  }
                })
              }

            </Box>
            <Box sx={{ flexGrow: 0, mr:2 }}>
              <span onClick={()=>context.setLang("es")} className="cursor-pointer">ES</span> / <span onClick={()=>context.setLang("en")} className="cursor-pointer">EN</span>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Mi Perfil">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user&&user.avatar?user.avatar:"https://www.sanboni.edu.co/onu/wp-content/uploads/avatar-mujer.png"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {menu_user.map((setting,key) =>{
                    if (setting.menu && !setting.private && !context.user) {
                      return <MenuItem  key={key}
                                        component={Link}
                                        to={setting.slug.replace('/:id', '')}
                                        onClick={()=>handleCloseUserMenu(setting)}>
                                          {setting.Icon?<setting.Icon></setting.Icon>:false}
                                          <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                    }else if (setting.menu && setting.private && context.user) {
                      return <MenuItem  key={key}
                                        component={Link}
                                        to={setting.slug.replace('/:id', '')}
                                        onClick={()=>handleCloseUserMenu(setting)}>
                                          {setting.Icon?<setting.Icon></setting.Icon>:false}
                                          <Typography textAlign="center">{setting.name}</Typography>
                            </MenuItem>
                    }else {
                      return false
                    }
                  }
                )}

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};
export default ResponsiveAppBar;
