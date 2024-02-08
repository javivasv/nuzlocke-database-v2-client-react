import { Grid, Card } from "@mui/material";

interface Props {
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  return (
    <Grid className={props.isMdAndUp ? "" : "only-content-second-half"} container flexDirection={"row"}>
      <Card className='secondary-content-card top-card'>
        TEST
      </Card>
    </Grid>
  );
}

export default SecondaryContent;
