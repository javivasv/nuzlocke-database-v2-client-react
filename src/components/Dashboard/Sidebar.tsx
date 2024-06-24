import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import useGoTo from '../../customHooks/useGoTo';
import useLogout from '../../customHooks/useLogout';
import { RootState } from "../../store/store";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Grid, Divider, Button, Switch, Avatar } from '@mui/material';
import { Home, CatchingPokemon, InfoOutlined, DarkMode, Login, Logout } from '@mui/icons-material';

interface Props {
  ToggleTheme: (e: boolean) => void;
}

function Sidebar(props: Props) {
  const location = useLocation();
  const theme = useTheme();
  const isLgAndUp = useMediaQuery('(min-width:1280px)');
  const user = useSelector((state: RootState) => state.auth.user);
  const [darkTheme, setDarkTheme] = useState(false);
  const goTo = useGoTo();
  const logout = useLogout();

  const sidebarItems = [
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

  useEffect(() => {
    const theme = window.localStorage.getItem("ndb_theme");

    if (theme === "dark") {
      setDarkTheme(true);
    }
  }, []);

  const IsSidebarItemActive = (itemName: string) => {
    return location.pathname.split("/")[1] === itemName;
  }

  const ChangeView = (itemName: string) => {
    goTo(`${itemName}`);
  }

  const ItemIcon = (itemName: string) => {
    switch(itemName) {
    case "home":
      return <Home data-testid="test-sidebar-home-icon" />;
    case "nuzlockes":
      return <CatchingPokemon data-testid="test-sidebar-pokeball-icon" />;
    case "about":
      return <InfoOutlined data-testid="test-sidebar-info-icon" />;
    default:
      return <Home />;
    }
  }

  const ChangeTheme = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setDarkTheme(target.checked);
    props.ToggleTheme(target.checked);
  }

  const HandleLog = () => {
    if (user) {
      logout();
      goTo("home")
    } else {
      goTo("login")
    }
  }

  return (
    <Grid id="sidebar" container item flexDirection={"column"}>
      <Grid id="title-container" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <h2>
          { isLgAndUp ? "Nuzlocke DataBase" : "NDB" }
        </h2>
      </Grid>
      <Divider className="horizontal-divider" />
      {
        user &&
        <>
          <Grid id="sidebar-username" container item flexDirection={"row"} justifyContent='center'>
            {
              isLgAndUp &&
              <span>
                { user.username }
              </span>
            }
            {
              !isLgAndUp &&
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                { user.username[0].toUpperCase() }
              </Avatar>
            }
          </Grid>
          <Divider className="horizontal-divider" />
        </>
      }
      {
        sidebarItems.map(item => (
          (item.name !== "nuzlockes" || (item.name === "nuzlockes" && user)) &&
          <Grid key={item.name} className={IsSidebarItemActive(item.name) ? 'sidebar-item active' : 'sidebar-item'} container item flexDirection={"row"} justifyContent='center' onClick={() => ChangeView(item.name)}>
            { ItemIcon(item.name) }
            { 
              isLgAndUp && 
              <span className='sidebar-item-title'>
                { item.title }
              </span>
            }
          </Grid>
        ))
      }
      <Grid id="title-container" container item flexDirection={"row"} alignItems="center" justifyContent='end'>
        <Switch checked={darkTheme} onChange={(e) => ChangeTheme(e)} />
        <DarkMode />
      </Grid>
      <div className="empty-space" />
      <Grid id="log-button-container" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
        <Button className="w-100" color='primary' variant="contained" onClick={HandleLog}>
          {
            user &&
            <Logout />
          }
          {
            !user &&
            <Login />
          }
          {
            isLgAndUp &&
            <span className="sidebar-log-text">
              { user ? "Logout" : "Login" }
            </span>
          }
        </Button>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
