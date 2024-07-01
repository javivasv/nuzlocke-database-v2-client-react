import useGoTo from '../../customHooks/useGoTo';
import { Nuzlocke } from "../../interfaces/interfaces";
import { Grid } from "@mui/material";
import { Flag, Done, Close } from '@mui/icons-material';

interface Props {
  nuzlocke: Nuzlocke;
}

function NuzlockeRow(props: Props) {
  const goTo = useGoTo();

  const CheckNuzlocke = () => {
    goTo(`nuzlockes/nuzlocke/${props.nuzlocke._id}`);
  }

  const ItemIcon = (itemStatus: string) => {
    switch(itemStatus) {
    case "started":
      return <Flag data-testid="test-nuzlockes-started-icon" />;
    case "completed":
      return <Done data-testid="test-nuzlockes-completed-icon" />;
    case "lost":
      return <Close data-testid="test-nuzlockes-lost-icon" />;
    default:
      return <Flag data-testid="test-nuzlockes-started-icon" />;
    }
  }

  return (
    <Grid className="table-row" container flexDirection={"row"} onClick={CheckNuzlocke}>
      <Grid container item flexDirection={"column"} xs={6}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span className="table-text">
            { props.nuzlocke.name }
          </span>
        </Grid>
      </Grid>
      <Grid container item flexDirection={"column"} xs={3}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span className="table-text">
            { props.nuzlocke.game }
          </span>
        </Grid>
      </Grid>
      <Grid container item flexDirection={"column"} xs={3}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          {
            ItemIcon(props.nuzlocke.status!)
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NuzlockeRow;
