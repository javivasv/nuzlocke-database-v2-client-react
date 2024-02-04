import { SyntheticEvent } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery, Grid, Divider, Button, Switch } from '@mui/material';
import { Home, CatchingPokemon, InfoOutlined, DarkMode, Login } from '@mui/icons-material';
//import LogoutIcon from '@mui/icons-material/Logout';
import '../../styles/Sidebar.css'

interface Props {
  ToggleTheme: (e: boolean) => void;
}

function Sidebar(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      title: "Home",
      name: "home",
      icon: "home",
    },
    {
      title: "Nuzlockes",
      name: "nuzlockes",
      icon: "list",
    },
    {
      title: "About",
      name: "about",
      icon: "info_outline",
    },
  ];

  const IsLgAndUp = () => {
    return useMediaQuery('(min-width:1280px)');
  }

  const IsSidebarItemActive = (itemName: string) => {
    return location.pathname.split("/")[1] === itemName;
  }

  const ChangeView = (itemName: string) => {
    navigate(`/${itemName}`);
  }

  const ItemIcon = (itemName: string) => {
    switch(itemName) {
    case "home":
      return <Home className='sidebar-item-icon' />;
    case "nuzlockes":
      return <CatchingPokemon className='sidebar-item-icon' />;
    case "about":
      return <InfoOutlined className='sidebar-item-icon' />;
    default:
      return <Home className='sidebar-item-icon' />;
    }
  }

  const ToLogin = () => {
    navigate(`/login`);
  }

  const ChangeTheme = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    props.ToggleTheme(target.checked);
  }

  return (
    <Grid id="sidebar" container item flexDirection={"column"}>
      <Grid id="title-container" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <h2>
          {IsLgAndUp() ? "Nuzlocke DataBase" : "NDB" }
        </h2>
      </Grid>
      <Divider />
      {items.map(item =>
        <Grid key={item.name} className={IsSidebarItemActive(item.name) ? 'sidebar-item active' : 'sidebar-item'} container item flexDirection={"row"} justifyContent='center' onClick={() => ChangeView(item.name)}>
          {ItemIcon(item.name)}
          <span>
            {item.title}
          </span>
        </Grid>
      )}
      <Grid id="title-container" container item flexDirection={"row"} alignItems="center" justifyContent='end'>
        <Switch onChange={(e) => ChangeTheme(e)}></Switch>
        <DarkMode />
      </Grid>
      <div className="empty-space"></div>
      <Grid id="log-button-container" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <Button className="w-100" color='primary' variant="contained" onClick={ToLogin}>
          <Login className="sidebar-log-icon" />
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
