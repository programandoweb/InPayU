import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

//let getInit = false

const App=(params)=>{
  const [items, setItems]                   =   React.useState([]);
  const [slug, setSlug]                     =   React.useState("");
  const [anchorEl, setAnchorEl]             =   React.useState(null);

  const open                                =   Boolean(anchorEl);


  React.useEffect(()=>{
    if (params.params && params.items && params.items[params.params.system])  {
      setSlug(params.params.slug)
      setItems(params.items[params.params.system])
    }
  },[params])

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
  };

  return  <div className="item-sub-menu">
            <List
              component="nav"
              aria-label="Device settings"
            >
              <ListItem
                button
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
              >
                <Typography textAlign="center" title={params.name}>
                  {params.name}
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
              {items.map((row,key)=>{
                return  <MenuItem key={key}
                                  component={Link}
                                  to={slug+row.slug}
                                  onClick={(event) => {handleMenuItemClick(event, key);}}
                                  >
                          {row.label}
                        </MenuItem>
              })}
            </Menu>
          </div>
}

export default App
