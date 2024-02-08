import { Grid, Card } from "@mui/material";
import pokeball from "../../assets/pokeball.png"

interface Props {
  children: React.ReactNode;
}

function InfoActionsCard(props: Props) {
  return (
    <div className="info-actions-card-container h-100 w-100">
      <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
        <img src={pokeball} className="pokeball" />
      </Grid>
      <Card className="info-actions-card">
        { props.children }
      </Card>
    </div>
  );
}

export default InfoActionsCard;