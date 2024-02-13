import { CustomError } from "../interfaces/interfaces";
import { Grid } from "@mui/material";
import MainContent from "../components/Nuzlockes/MainContent";
import SecondaryContent from "../components/Nuzlockes/SecondaryContent";

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function NuzlockesLayout(props: Props) {
  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      {
        props.isMdAndUp &&
        <>
          <Grid className="main-content" container item flexDirection={"column"} xs={8}>
            <MainContent GoTo={props.GoTo} />
          </Grid>
          <Grid className="secondary-content" container item flexDirection={"column"} xs={4}>
            <SecondaryContent ValidateError={props.ValidateError} GoTo={props.GoTo} isMdAndUp={props.isMdAndUp} />
          </Grid>
        </>
      }
      {
        !props.isMdAndUp &&
        <Grid className="only-content" container item flexDirection={"column"} xs={12}>
          <MainContent GoTo={props.GoTo} />
          <SecondaryContent ValidateError={props.ValidateError} GoTo={props.GoTo} isMdAndUp={props.isMdAndUp} />
        </Grid>
      }
    </Grid>
  );
}
  
export default NuzlockesLayout;