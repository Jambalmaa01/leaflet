import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: orange[500],
    },
  },
  cssVariables: true,
});

export default theme;
