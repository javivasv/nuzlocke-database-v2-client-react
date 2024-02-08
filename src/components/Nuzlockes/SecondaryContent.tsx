import { Grid } from "@mui/material";
import InfoActionsCard from "../InfoActions/InfoActionsCard";
import Nuzlockes from "../InfoActions/Nuzlockes";

interface Props {
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  return (
    <Grid className={props.isMdAndUp ? "" : "only-content-second-half"} container flexDirection={"row"}>
      <InfoActionsCard>
        <Nuzlockes GoTo={props.GoTo} />
      </InfoActionsCard>
    </Grid>
  );
}

export default SecondaryContent;
