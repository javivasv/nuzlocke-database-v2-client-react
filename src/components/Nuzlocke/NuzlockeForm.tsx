import { Grid } from "@mui/material";
import { CustomError } from "../../interfaces/interfaces";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function NuzlockeForm(props: Props) {
  return (
    <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
        NUZLOCKE FORM
    </Grid>
  );
}

export default NuzlockeForm;