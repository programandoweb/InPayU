import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
//import BeachAccessIcon from '@mui/icons-material/BeachAccess';

export default function FolderList({data}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {data && data.length>0?<>
        {data.map((row,key)=>{
          return  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar>
                        {key % 2 === 0?<ImageIcon />:<WorkIcon /> }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={row.label} secondary="" />
                  </ListItem>
        })}
      </>:false}
    </List>
  );
}
