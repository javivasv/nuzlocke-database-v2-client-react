import { Grid } from "@mui/material";
import InfoActionsCard from "../InfoActions/InfoActionsCard";

interface Props {
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  return (
    <Grid className={props.isMdAndUp ? "" : "only-content-second-half"} container flexDirection={"row"}>
      <InfoActionsCard cardType="nuzlockes" />
    </Grid>
  );
}

export default SecondaryContent;
