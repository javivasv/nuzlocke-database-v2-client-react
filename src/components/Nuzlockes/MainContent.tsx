import { Outlet, useLocation } from 'react-router-dom';
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';

function MainContent() {
  const location = useLocation();

  const IsRootNuzlockes = () => {
    return location.pathname.split("/").length > 2;
  }

  const HandleGoBack = () => {
    console.log("HANDLE GO BACK"); 
  }

  return (
    <>
      {
        IsRootNuzlockes() &&
        <Grid className="back-buttton-row" container flexDirection={"row"}>
          <IconButton onClick={HandleGoBack}>
            <ArrowBack />
          </IconButton>
        </Grid>
      }
      <Outlet />
    </>
  );
}

export default MainContent;
