import { Grid } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: Props) {
  return (
    <Grid container flexDirection={"row"} role="tabpanel" hidden={props.value !== props.index}>
      {
        props.value === props.index &&
        <Grid container item flexDirection={"column"}>
          { props.children }
        </Grid>
      }
    </Grid>
  );
}

export default TabPanel;
