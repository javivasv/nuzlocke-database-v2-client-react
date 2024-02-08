import { Grid, Card } from "@mui/material";
import pokeball from "../../assets/pokeball.png"
import Nuzlockes from "./Nuzlockes";

interface Props {
  cardType: string;
}

function InfoActionsCard(props: Props) {
  return (
    <div className="info-actions-card-container h-100 w-100">
      <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
        <img src={pokeball} className="pokeball" />
      </Grid>
      <Card className="info-actions-card">
        {
          props.cardType === "nuzlockes" &&
          <Nuzlockes />
        }
      </Card>
    </div>
  );
}

export default InfoActionsCard;