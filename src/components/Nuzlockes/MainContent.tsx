import { Outlet, useLocation } from 'react-router-dom';
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';

interface Props {
  GoTo: (e: string) => void;
}

function MainContent(props: Props) {
  const location = useLocation();

  const IsRootNuzlockes = () => {
    return location.pathname.split("/").length > 2;
  }

  const HandleGoBack = () => {
    if (location.pathname.includes("nuzlocke-form")) {
      props.GoTo("nuzlockes");
    } else {
      console.log("TO NUZLOCKE");
    }
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
