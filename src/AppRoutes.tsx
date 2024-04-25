import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "./store/store";
import { validateSession, setUser } from './store/auth/authSlice';
import { showSnackbar } from './store/notifications/notificationsSlice';
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
import useValidateError from './customHooks/useValidateError';

interface Props {
  ToggleTheme: (e: boolean) => void;
}

function AppRoutes(props: Props) {
  const isMdAndUp = useMediaQuery('(min-width:960px)');
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const validateError = useValidateError();

  useEffect(() => {
    dispatch(validateSession())
      .unwrap()
      .then(res => {
        dispatch(setUser(res));
      })
      .catch(error => {
        dispatch(showSnackbar(error.msg));
        validateError(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Routes>
      <Route element={<Dashboard ToggleTheme={props.ToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={isMdAndUp} />} />
        <Route path="nuzlockes" element={<NuzlockesLayout isMdAndUp={isMdAndUp} />}>
          <Route index path="" element={<NuzlockesContainer />} />
          <Route path="nuzlocke-form" element={<NuzlockeForm />} />
          <Route path="nuzlocke" element={<NuzlockeContainer />}>
            <Route path=":nuzlockeId/nuzlocke-form" element={<NuzlockeForm />} />
            <Route path=":nuzlockeId" element={<Nuzlocke isMdAndUp={isMdAndUp} />} />
            <Route path=":nuzlockeId/pokemon-form" element={<PokemonFormContainer isMdAndUp={isMdAndUp} />} />
            <Route path=":nuzlockeId/pokemon/:pokemonId" element={<PokemonFormContainer isMdAndUp={isMdAndUp} />} />
          </Route>
        </Route>
        <Route path="about" element={<About isMdAndUp={isMdAndUp} />} />
      </Route>
      {!user && 
        <Route element={<Auth />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
          <Route path="reset-password/:resetToken" element={<ResetPassword />}></Route>
        </Route>
      }
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
}

export default AppRoutes
