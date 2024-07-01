import { Grid, Card } from "@mui/material";
import pokeball from "../../assets/pokeball.png"

interface Props {
  children: React.ReactNode;
}

function InfoActionsCard(props: Props) {
  return (
    <div id="info-actions-card-container" className="h-100 w-100">
      <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
        <img src={pokeball} id="pokeball" alt="Pokeball" />
      </Grid>
      <Card id="info-actions-card">
        { props.children }
      </Card>
    </div>
  );
}

export default InfoActionsCard;