import { useLocation, useParams, Outlet } from 'react-router-dom';
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import useGoTo from '../../customHooks/useGoTo';

function MainContent() {
  const location = useLocation();
  const { nuzlockeId } = useParams();
  const goTo = useGoTo();

  const IsRootNuzlockes = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);
    return pathSplit.length !== 1;
  }

  const HandleGoBack = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);

    if (pathSplit.includes("nuzlocke-form")) {
      if (pathSplit.length === 2) {
        goTo("nuzlockes");
      } else {
        goTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
      }
    } else {
      if (pathSplit.length === 3) {
        goTo("nuzlockes");
      } else {
        goTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
      }
    }
  }

  return (
    <>
      {
        IsRootNuzlockes() &&
        <Grid id="back-buttton-row" container flexDirection={"row"}>
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
