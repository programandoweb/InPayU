import { createTheme } from '@mui/material/styles';
import {red,grey,blue ,purple} from '@mui/material/colors';
export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        variants: [
          {
            props: { variant: 'overline' }, /* component props */
            style: {
              /* your style here: */
              color: 'red',
            },
          },
        ],
      }
    },

    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '0.7rem',
          borderRadius: 30,
          //color:"#333",
        },
      },
    },

    MuiAppBar: {

      variants: [
        {
          props: { variant: 'jorge' },
          style: {
            textTransform: 'none',
            border: `2px dashed ${blue[500]}`,
          },
        },
        {
          props: { variant: 'jorge', color: 'secondary' },
          style: {
            border: `4px dashed ${red[500]}`,
          },
        },
      ],

      // styleOverrides: {
      //   // Name of the slot
      //   root: {
      //     // Some CSS
      //     // fontSize: '0.7rem',
      //     // borderRadius: 30,
      //     //color:"#333",
      //     borderBottomLeftRadius: 30,
      //     borderBottomRightRadius: 30,
      //   },
      // },
    },

  },
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: blue[500],
      fontSize:5,
    },
    secondary: {
      /*main: grey[500],*/
      main: "#000",
    },
    info: {
      main: "#fff",
    },
    danger: {
      //main: grey[900],
      contrastText: '#ffffff',
    },
    gray: {
      main: grey[900],
      contrastText: '#ffffff',
    },
    gray2: {
      main: grey[100],
      contrastText: '#333',
    },
    purple:{
      main: "#6425cc",
      contrastText: '#ffffff',
    },
    green:{
      main: "#a5c206",
      contrastText: '#444',
    },
    tabList:{
      main: 'rgba(255,255,255,0.1)',
    }
  },

});
