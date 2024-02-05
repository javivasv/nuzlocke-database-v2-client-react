import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import '../styles/Dashboard.css'
import Sidebar from '../components/Dashboard/Sidebar';

interface Props {
  ToggleTheme: (e: boolean) => void;
  GoTo: (e: string) => void;
}

function Dashboard(props: Props) {
  const theme = useTheme();

  return (
    <Grid className="h-100" container flexDirection={"row"}>
      <Grid id="sidebar-container" className={theme.palette.mode} container item flexDirection={"column"} xs={2} md={1} lg={2}>
        <Grid className="h-100" container item flexDirection={"row"}>
          <Sidebar ToggleTheme={props.ToggleTheme} GoTo={props.GoTo} />
        </Grid>
      </Grid>
      <Grid id="content-container" className={theme.palette.mode} container item flexDirection={"column"} xs={10} md={11} lg={10}>
        <Grid className="h-100" container item flexDirection={"row"}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
