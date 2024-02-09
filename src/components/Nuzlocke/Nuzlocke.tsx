import { useEffect } from 'react';
import { Grid, Card } from "@mui/material";

function Nuzlockes() {
  useEffect(() => {
    console.log("NUZLOCKE");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <Grid container flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Nuzlockes;
