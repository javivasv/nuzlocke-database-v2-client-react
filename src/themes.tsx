import { createTheme } from '@mui/material/styles';

const basicPalette = {
  primary: {
    main: '#EE1515',
  },
  secondary: {
    main: '#1685C5',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...basicPalette,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...basicPalette,
  },
  typography: {
    button: {
      textTransform: 'none'
    },
  },
});