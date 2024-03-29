import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { validateSession, setUser } from './store/auth/authSlice';
import { setNuzlockes } from './store/nuzlockes/nuzlockesSlice';
import { showSnackbar } from './store/notifications/notificationsSlice';
import { CustomError } from './interfaces/interfaces';
import { useMediaQuery } from "@mui/material";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import NuzlockesLayout from "./containers/NuzlockesLayout";
import About from "./containers/About";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import NuzlockesContainer from './containers/NuzlockesContainer';
import NuzlockeForm from "./components/Nuzlocke/NuzlockeForm";
import Nuzlocke from "./components/Nuzlocke/Nuzlocke";
import NuzlockeContainer from './containers/NuzlockeContainer';
import PokemonFormContainer from './containers/PokemonFormContainer';

interface Props {
  ToggleTheme: (e: boolean) => void;
}

function AppRoutes(props: Props) {
  const isMdAndUp = useMediaQuery('(min-width:960px)');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(validateSession())
      .unwrap()
      .then(res => {
        dispatch(setUser(res));
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
        ValidateError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Logout = () => {
    window.localStorage.removeItem("ndb_token");
    dispatch(setUser(null));
    dispatch(setNuzlockes([]));
    GoTo("home");
  }

  const ValidateError = (error: CustomError) => {
    if (!error.status || !error.msg) {
      return;
    }

    if (
      error.status === 401 ||
      error.status === 403 ||
      error.status === 404
    ) {
      Logout();
    }

    dispatch(showSnackbar(error.msg));
  }

  const GoTo = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Routes>
      <Route element={<Dashboard ToggleTheme={props.ToggleTheme} GoTo={GoTo} Logout={Logout} />}>
        <Route index path="home" element={<Home ValidateError={ValidateError} isMdAndUp={isMdAndUp} />} />
        <Route path="nuzlockes" element={<NuzlockesLayout ValidateError={ValidateError} GoTo={GoTo} isMdAndUp={isMdAndUp} />}>
          <Route index path="" element={<NuzlockesContainer ValidateError={ValidateError} GoTo={GoTo} />} />
          <Route path="nuzlocke-form" element={<NuzlockeForm ValidateError={ValidateError} GoTo={GoTo} />} />
          <Route path="nuzlocke" element={<NuzlockeContainer ValidateError={ValidateError} />}>
            <Route path=":nuzlockeId/nuzlocke-form" element={<NuzlockeForm ValidateError={ValidateError} GoTo={GoTo} />} />
            <Route path=":nuzlockeId" element={<Nuzlocke ValidateError={ValidateError} GoTo={GoTo} isMdAndUp={isMdAndUp} />} />
            <Route path=":nuzlockeId/pokemon-form" element={<PokemonFormContainer ValidateError={ValidateError} GoTo={GoTo} isMdAndUp={isMdAndUp} />} />
            <Route path=":nuzlockeId/pokemon/:pokemonId" element={<PokemonFormContainer ValidateError={ValidateError} GoTo={GoTo} isMdAndUp={isMdAndUp} />} />
          </Route>
        </Route>
        <Route path="about" element={<About ValidateError={ValidateError} isMdAndUp={isMdAndUp} />} />
      </Route>
      {!user && 
        <Route element={<Auth />}>
          <Route path="login" element={<Login GoTo={GoTo} />}></Route>
          <Route path="register" element={<Register GoTo={GoTo} />}></Route>
          <Route path="forgot-password" element={<ForgotPassword GoTo={GoTo} />}></Route>
          <Route path="reset-password/:resetToken" element={<ResetPassword GoTo={GoTo} />}></Route>
        </Route>
      }
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default AppRoutes
