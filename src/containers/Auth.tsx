import '../styles/Auth.css'
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <Grid className="h-100" container flexDirection={"row"}>
      <Grid id="auth-container" container item flexDirection={"column"}>
        <Outlet />
      </Grid>
    </Grid> 
  );
}

export default Auth;
