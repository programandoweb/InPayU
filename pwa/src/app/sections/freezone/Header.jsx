import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import image from '../../../assets/images/logoWhite.png';
import Menu from '@mui/material/Menu';
import {modules} from './zones';
import StateContext from '../../../helpers/ContextState';
import IconCart from '../../../components/ShoppingCart/IconCart';
import SocialNetworks from '../../../components/SocialNetworks';

const ButtonAppBar=()=>{
  const context                           =   React.useContext(StateContext);
  const [items,setItems]                  =   React.useState({})

  React.useEffect(()=>{
    if (context.system && !items.categorias) {
      setItems(context.system)
    }
  },[context,items])


  //const [anchorEl, setAnchorEl]           =   React.useState(null);
  const [anchorElNav, setAnchorElNav]     =   React.useState(null);

  // const handleClickListItem = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  //const open = Boolean(anchorEl);
  // const handleClose = () => {
  //   //setAnchorEl(null);
  // };

  // const handleMenuItemClick = (page, event, index) => {
  //   handleCloseNavMenu(page);
  //   //setAnchorEl(null);
  // };


  return  <AppBar position="fixed" color="secondary">
            <Container >
              <Toolbar disableGutters>
                <MenuItem to="/"
                          className="text-white"
                          component={Link}
                          sx={{
                            display: { xs: 'none', md: 'flex' },
                          }}>
                  <CardMedia
                    component="img"
                    height="50"
                    image={image}
                    alt="Programandoweb"
                  />
                </MenuItem>
                {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />*/}
                {/*este es el container para disppositivos*/}
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
                            if ( (page.items && page.items.length===0) && page.menu && !page.plugins ) {
                                return  <MenuItem key={key}
                                                    disableGutters={false}
                                                    component={Link}
                                                    to={page.url||page.slug}
                                                    onClick={()=>handleCloseNavMenu(page)}>
                                          <Typography textAlign="center">{page.name}</Typography>
                                        </MenuItem>
                            }else if ((page.items!==undefined && page.items.length>0) && page.menu && !page.plugins) {

                            }else if (page.menu && page.plugins) {
                              return <div key={key}>{<page.component {...page} items={items}/>}</div>
                            }
                            return false
                          })
                        }
                    </Menu>
                </Box>
                {/*este es el container para pc*/}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    {
                      modules.map((page,key) =>{
                        if ( (page.items && page.items.length===0) && page.menu && !page.plugins ) {
                            return  <MenuItem key={key}
                                                disableGutters={false}
                                                component={Link}
                                                to={page.url||page.slug}
                                                onClick={()=>handleCloseNavMenu(page)}>
                                      <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                        }else if ((page.items!==undefined && page.items.length>0) && page.menu && !page.plugins) {

                        }else if (page.menu && page.plugins) {
                          return <div key={key}>{<page.component {...page} items={items} />}</div>
                        }
                        return false
                      })
                    }

                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <SocialNetworks/>
                  <IconCart/>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

}

export default ButtonAppBar
