import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, IconButton, Backdrop } from "@mui/material";
import { Menu } from '@mui/icons-material';
import SidebarContainer from "../containers/SidebarContainer"

interface Props {
  ToggleTheme: (e: boolean) => void;
}

function Dashboard(props: Props) {
  const theme = useTheme();
  const isMdAndUp = useMediaQuery('(min-width:900px)');
  const [open, setOpen] = useState(false);

  const HandleOpen = () => {
    setOpen(true);
  };

  const HandleClose = () => {
    setOpen(false);
  };

  return (
    <Grid className="h-100" container flexDirection={"row"}>
      {
        isMdAndUp &&
        <SidebarContainer ToggleTheme={props.ToggleTheme} />
      }
      <Grid id="content-container" className={`${theme.palette.mode}`} container item flexDirection={"column"} xs={12} md={10}>
        {
          !isMdAndUp && 
          <Grid id="sidebar-buttton-row" container flexDirection={"row"}>
            <IconButton onClick={HandleOpen}>
              <Menu />
            </IconButton>
            <Backdrop
              open={open}
              transitionDuration={350}
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, justifyContent: "start" }}
            >
              <SidebarContainer ToggleTheme={props.ToggleTheme} HandleClose={HandleClose} />
            </Backdrop>
          </Grid>
        }
        <Grid className={`thin-scrollbar ${isMdAndUp ? 'h-100' : 'small-screen-content'}`} container item flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;