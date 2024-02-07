import { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "./store/store";
import { validateSession, setUser } from './store/auth/authSlice';
import { showSnackbar } from './store/notifications/notificationsSlice';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from "./themes";
import NotificationSnackbar from './components/Notifications/NotificationSnackbar';
import AppRoutes from './AppRoutes';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    dispatch(validateSession()).unwrap()
      .then(res => {
        dispatch(setUser(res));
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
        Logout();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ToggleTheme = (toggle: boolean) => {
    setIsDarkTheme(toggle);
  };

  const Logout = () => {
    window.localStorage.removeItem("ndb_token");
    dispatch(setUser(null));
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes ToggleTheme={ToggleTheme} Logout={Logout} />
      </BrowserRouter>
      <NotificationSnackbar />
    </ThemeProvider>
  )
}

export default App
