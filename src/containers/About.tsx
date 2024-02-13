import { CustomError } from '../interfaces/interfaces';
import { Grid } from "@mui/material";
import MainContent from "../components/About/MainContent";
import SecondaryContent from "../components/About/SecondaryContent";

interface Props {
  ValidateError: (e: CustomError) => void;
  isMdAndUp: boolean;
}

function About(props: Props) {
  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      {
        props.isMdAndUp &&
        <>
          <Grid className="main-content" container item flexDirection={"column"} xs={8}>
            <MainContent />
          </Grid>
          <Grid className="secondary-content" container item flexDirection={"column"} xs={4}>
            <SecondaryContent ValidateError={props.ValidateError} isMdAndUp={props.isMdAndUp} />
          </Grid>
        </>
      }
      {
        !props.isMdAndUp &&
        <Grid className="only-content" container item flexDirection={"column"} xs={12}>
          <MainContent />
          <SecondaryContent ValidateError={props.ValidateError} isMdAndUp={props.isMdAndUp} />
        </Grid>
      }
    </Grid>
  );
}
    
export default About;
    