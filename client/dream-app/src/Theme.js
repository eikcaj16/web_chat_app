import {createTheme} from "@mui/material";
import Abel from "@fontsource/abel"

const ThemeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#23274D',
    },
    secondary: {
      main: '#CE4793',
    },
  },
  typography: {
    fontFamily: "Abel"
  }
});

export default ThemeOptions