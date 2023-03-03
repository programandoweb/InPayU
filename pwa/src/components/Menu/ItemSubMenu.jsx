import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import {modules} from '../../helpers/modules';
import { Link } from "react-router-dom";

//let prefijo           =   process.env.REACT_APP_PREFIJOADMIN

export default function SimpleListMenu({ico,label,data,page,handleCloseNavMenu,prefBool,prefijo}) {
  const [anchorEl, setAnchorEl]             =   React.useState(null);


  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);

  };

  const handleMenuItemClick = (event, index) => {
    handleCloseNavMenu(page);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (prefBool) {
    prefijo=''
  }

  return (
    <div className="item-sub-menu">
      <List
        component="nav"
        aria-label="Device settings"

      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <Typography textAlign="center" title={label}>
            {ico||label}
          </Typography>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {data.map((option, index) => {
            if (option.menu && option.slug) {
              if (!option.plugins) {
                return <MenuItem
                                  key={index}
                                  component={Link}
                                  to={prefijo+option.slug}
                                  selected={(modules.find((search)=>search.slug===option.slug)?true:false)}
                                  onClick={(event) => {handleMenuItemClick(event, index);}}
                                >
                                    {option.name}
                      </MenuItem>
              }else {
                return <div key={index}><option.component /></div>
              }

            }else {
              return false
            }
          }
        )}
      </Menu>
    </div>
  );
}
