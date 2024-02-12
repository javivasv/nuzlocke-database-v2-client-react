import { useLocation, useParams, Outlet } from 'react-router-dom';
import { Grid, IconButton } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';

interface Props {
  GoTo: (e: string) => void;
}

function MainContent(props: Props) {
  const location = useLocation();
  const { nuzlockeId } = useParams();

  const IsRootNuzlockes = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);
    return pathSplit.length !== 1;
  }

  const HandleGoBack = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);

    if (pathSplit.includes("nuzlocke-form")) {
      if (pathSplit.length === 2) {
        props.GoTo("nuzlockes");
      } else {
        props.GoTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
      }
    } else {
      if (pathSplit.length === 3) {
        props.GoTo("nuzlockes");
      } else {
        props.GoTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
      }
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
