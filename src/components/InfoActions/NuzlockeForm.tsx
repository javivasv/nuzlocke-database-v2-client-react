import { Grid } from "@mui/material";
import CustomCardContent from "../CustomCardContent";

function NuzlockeForm() {
  return (
    <CustomCardContent>
      <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
        <span className="card-text">
          <strong>Name:&nbsp;</strong>
          The name of the playthrough
        </span>
      </Grid>
      <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
        <span className="card-text">
          <strong>Game:&nbsp;</strong>
          The name of the game
        </span>
      </Grid>
      <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
        <span className="card-text">
          <strong>Description:&nbsp;</strong>
          Relevant information of the playthrough, such as extra rules
        </span>
      </Grid>
    </CustomCardContent>
  );
}

export default NuzlockeForm;