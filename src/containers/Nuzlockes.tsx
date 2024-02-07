import { Grid } from "@mui/material";
import MainContent from "../components/Nuzlockes/MainContent";
import SecondaryContent from "../components/Nuzlockes/SecondaryContent";

interface Props {
  GoTo: (e: string) => void;
}

function Nuzlockes(props: Props) {
  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      <Grid className="main-content" container item flexDirection={"column"} xs={12} md={8}>
        <MainContent GoTo={props.GoTo} />
      </Grid>
      <Grid className="secondary-content" container item flexDirection={"column"} xs={12} md={4}>
        <SecondaryContent />
      </Grid>
    </Grid>
  );
}
  
export default Nuzlockes;