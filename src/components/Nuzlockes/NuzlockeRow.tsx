import { Nuzlocke } from "../../interfaces/interfaces";
import { Grid } from "@mui/material";
import { Flag, Done, Close } from '@mui/icons-material';

interface Props {
  nuzlocke: Nuzlocke;
}

function NuzlockeRow(props: Props) {
  const checkNuzlocke = () => {
    console.log("sfghdfkj");
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
    <Grid className="table-row" container flexDirection={"row"} onClick={checkNuzlocke}>
      <Grid container item flexDirection={"column"} xs={6}>
        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span>
            { props.nuzlocke.name }
          </span>
        </Grid>
      </Grid>
      <Grid container item flexDirection={"column"} xs={3}>
        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span>
            { props.nuzlocke.game }
          </span>
        </Grid>
      </Grid>
      <Grid container item flexDirection={"column"} xs={3}>
        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
          {
            ItemIcon(props.nuzlocke.status!)
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NuzlockeRow;
