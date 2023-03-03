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
        <Box sx={{ p: 0 }}>
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

export default function FullWidthTabs({components,inputs,value_externo}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(value_externo||0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  React.useEffect(()=>{
    if (value!==value_externo) {
      setValue(value_externo)
    }
  },[value_externo])


  return (
    <Box sx={{ width: "100%" }}>
      {
          components && components.length>0?<>
              <AppBar position="static" color="secondary">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  {
                    components.map((row,key)=>{
                      return <Tab disabled={!inputs.id && key>0?true:false} key={key} sx={{fontSize:{md:14,xs:9}}} label={row.label} {...a11yProps(key)} />
                    })
                  }
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                {
                  components.map((row,key)=>{
                    return  <TabPanel key={key} value={value} index={key} dir={theme.direction}>
                                {row.component}
                            </TabPanel>
                  })
                }
              </SwipeableViews>
            </>:<>

          </>
      }

    </Box>
  );
}
