import { Nuzlocke } from "../../interfaces/interfaces";
import { Grid } from "@mui/material";
import { Flag, Done, Close } from '@mui/icons-material';

interface Props {
  GoTo: (e: string) => void;
  nuzlocke: Nuzlocke;
}

function NuzlockeRow(props: Props) {
  const CheckNuzlocke = () => {
    props.GoTo(`nuzlockes/nuzlocke/${props.nuzlocke._id}`);
  }

  const ItemIcon = (itemStatus: string) => {
    switch(itemStatus) {
    case "started":
      return <Flag />;
    case "completed":
      return <Done />;
    case "lost":
      return <Close />;
    default:
      return <Flag />;
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
