import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from "./themes";
import NotificationSnackbar from './components/Notifications/NotificationSnackbar';
import AppRoutes from './AppRoutes';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const ToggleTheme = (toggle: boolean) => {
    setIsDarkTheme(toggle);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes ToggleTheme={ToggleTheme} />
      </BrowserRouter>
      <NotificationSnackbar />
    </ThemeProvider>
  )
}

export default App
