import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import Nuzlockes from "./containers/Nuzlockes";
import About from "./containers/About";
import Auth from "./containers/Auth";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="nuzlockes" element={<Nuzlockes />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />}></Route>
          <Route path="reset-password/:resetToken" element={<ResetPassword />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
