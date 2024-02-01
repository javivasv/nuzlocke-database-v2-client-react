import '../styles/Dashboard.css'
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/Dashboard/Sidebar';

function Dashboard() {
  return (
    <Grid className="h-100" container flexDirection={"row"}>
      <Grid id="sidebar-container" container item flexDirection={"column"} xs={2} md={1} lg={2}>
        <Grid className="h-100" container item flexDirection={"row"}>
          <Sidebar />
        </Grid>
      </Grid>
      <Grid id="content-container" container item flexDirection={"column"} xs={10} md={11} lg={10}>
        <Grid className="h-100" container item flexDirection={"row"}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
