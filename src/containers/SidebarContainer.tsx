import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid } from "@mui/material";
import Sidebar from '../components/Dashboard/Sidebar';

interface Props {
  ToggleTheme: (e: boolean) => void;
  HandleClose?: () => void;
}

function Dashboard(props: Props) {
  const theme = useTheme();
  const isMdAndUp = useMediaQuery('(min-width:900px)');

  return (
    <Grid id="sidebar-container" className={theme.palette.mode} container item flexDirection={"column"} md={isMdAndUp ? 2 : 4} xs={!isMdAndUp ? 6 : 2} sm={!isMdAndUp ? 4 : 2}>
      <Grid className="h-100" container item flexDirection={"row"}>
        <Sidebar ToggleTheme={props.ToggleTheme} HandleClose={props.HandleClose} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;