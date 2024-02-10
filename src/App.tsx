import { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from "./themes";
import NotificationSnackbar from './components/Notifications/NotificationSnackbar';
import AppRoutes from './AppRoutes';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const theme = window.localStorage.getItem("ndb_theme");

    if (theme === "dark") {
      ToggleTheme(true);
    }
  }, []);

  const ToggleTheme = (toggle: boolean) => {
    setIsDarkTheme(toggle);
    window.localStorage.setItem("ndb_theme", toggle ? "dark" : "light");
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
