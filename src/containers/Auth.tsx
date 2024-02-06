import { Outlet } from "react-router-dom";
import { Grid, Card } from "@mui/material";

function Auth() {
  return (
    <Grid className="h-100" container flexDirection={"row"}>
      <Grid id="auth-container" container item flexDirection={"column"}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
          <Card className='auth-card'>
            <Grid container flexDirection={"row"}>
              <Outlet />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid> 
  );
}

export default Auth;
