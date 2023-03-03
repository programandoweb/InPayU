import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FolderList({data,className,notReply}) {
  return (
    <List sx={{ width: '100%',  }}>
      {data && data.length>0?<>
        {data.map((row,key)=>{
          return  <ListItem key={key} className={className||"UlLI-content"}>
                    <ListItemText primary={row.label} secondary="" className="t-12 width-50" />
                    {!notReply?<ListItemText primary={row.label2+" "+row.label3} secondary="" className="t-10 " />:false}
                    <ListItemAvatar>
                      <KeyboardArrowDownIcon />
                    </ListItemAvatar>
                  </ListItem>
        })}
      </>:false}
    </List>
  );
}
