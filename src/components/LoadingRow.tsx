import { Grid, CircularProgress } from "@mui/material";

function LoadingRow() {
  return (
    <Grid id="loading-row" container flexDirection={"row"} alignItems="center" justifyContent="center">
      <CircularProgress color="primary" />
    </Grid>
  );
}

export default LoadingRow;
