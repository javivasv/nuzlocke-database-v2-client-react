import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "./store/store";
import { CustomError } from './interfaces/interfaces';
import { useMediaQuery } from "@mui/material";
import './App.css'
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import NuzlockesContainer from "./containers/NuzlockesContainer";
import About from "./containers/About";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Nuzlockes from "./components/Nuzlockes/Nuzlockes";
import NuzlockeForm from "./components/Nuzlocke/NuzlockeForm";

interface Props {
  ToggleTheme: (e: boolean) => void;
  Logout: () => void;
  ValidateError: (e: CustomError) => void;
}

function AppRoutes(props: Props) {
  const navigate = useNavigate();
  const isMdAndUp = useMediaQuery('(min-width:960px)');
  const user = useSelector((state: RootState) => state.auth.user);

  const GoTo = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Routes>
      <Route element={<Dashboard ToggleTheme={props.ToggleTheme} GoTo={GoTo} Logout={props.Logout} />}>
        <Route index path="home" element={<Home ValidateError={props.ValidateError} isMdAndUp={isMdAndUp} />} />
        <Route path="nuzlockes" element={<NuzlockesContainer GoTo={GoTo} isMdAndUp={isMdAndUp} />}>
          <Route index path="" element={<Nuzlockes ValidateError={props.ValidateError} />} />
          <Route path="nuzlocke-form" element={<NuzlockeForm ValidateError={props.ValidateError} />} />
        </Route>
        <Route path="about" element={<About ValidateError={props.ValidateError} isMdAndUp={isMdAndUp} />} />
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
