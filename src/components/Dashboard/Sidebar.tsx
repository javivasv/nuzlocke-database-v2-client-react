import '../../styles/Sidebar.css'
import { useNavigate } from "react-router-dom";
import { useMediaQuery, Grid, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Sidebar() {
  const navigate = useNavigate();

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

  const useIsLgAndUp = () => {
    return useMediaQuery('(min-width:1280px)');
  }

  const changeView = (itemName: string) => {
    navigate(`/${itemName}`);
  }

  const itemIcon = (itemName: string) => {
    switch(itemName) {
    case "home":
      return <HomeIcon className='sidebar-item-icon' />;
    case "nuzlockes":
      return <CatchingPokemonIcon className='sidebar-item-icon' />;
    case "about":
      return <InfoOutlinedIcon className='sidebar-item-icon' />;
    default:
      return <HomeIcon className='sidebar-item-icon' />;
    }
  }

  const login = () => {
    navigate(`/login`);
  }

  return (
    <Grid id="sidebar" container item flexDirection={"column"}>
      <Grid id="title-container" container item flexDirection={"row"} justifyContent='center'>
        <h2>
          {useIsLgAndUp() ? "Nuzlocke DataBase" : "NDB" }
        </h2>
      </Grid>
      <Divider />
      {items.map(item =>
        <Grid key={item.name} className='sidebar-item' container item flexDirection={"row"} justifyContent='center' onClick={() => changeView(item.name)}>
          {itemIcon(item.name)}
          <span>
            {item.title}
          </span>
        </Grid>
      )}
      <div className="empty-space"></div>
      <Grid id="log-button-container" container item flexDirection={"row"} justifyContent='center'>
        <Button className="w-100" variant="contained" onClick={login}>Login</Button>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
