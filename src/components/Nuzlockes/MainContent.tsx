import { Outlet, useLocation } from 'react-router-dom';
import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Props {
  GoTo: (e: string) => void;
}

function MainContent(props: Props) {
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
            <ArrowBackIcon />
          </IconButton>
        </Grid>
      }
      <Outlet />
    </>
  );
}

export default MainContent;
