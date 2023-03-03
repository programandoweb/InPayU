import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReactHtmlParser from 'react-html-parser';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div" align="left">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs({data}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };



  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" color="secondary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab sx={{fontSize:{md:14,xs:9}}} label="Descripción" {...a11yProps(0)} />
          <Tab sx={{fontSize:{md:14,xs:9}}} label="Incluye" {...a11yProps(1)} />
          <Tab sx={{fontSize:{md:14,xs:9}}} label="Ficha técnica" {...a11yProps(2)} />
          <Tab sx={{fontSize:{md:14,xs:9}}} label="Envío y entrega" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          {ReactHtmlParser(data.description||"")}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          {
            data.incluye && data.incluye.length>0?<ul>
              {data.incluye.map((row,key)=>{
                return  <li key={key}>
                          {row.valor}
                        </li>
              })}
            </ul>:<>
            No hay descripción
            </>
          }
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          {
            data.ficha && data.ficha.length>0?<ul>
              {data.ficha.map((row,key)=>{
                return  <li key={key}>
                          {row.valor}
                        </li>
              })}
            </ul>:<>
            No hay descripción
            </>
          }
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          {
            data.envio && data.envio.length>0?<ul>
              {data.envio.map((row,key)=>{
                return  <li key={key}>
                          {row.valor}
                        </li>
              })}
            </ul>:<>
            No hay descripción
            </>
          }
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
