import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { 
      // light: ',
      main: '#1DA1F2',
      // dark: ,
      contrastText: 'white',
    },
    secondary: { 
      // light: ',
      main: '#ffcc00',
      // dark: ,
      contrastText: 'black',
    },
  }

  // typography: {
  //   fontFamily:['Arial']
  // }
});

export default theme;