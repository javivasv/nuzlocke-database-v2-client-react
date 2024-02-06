import { Grid } from "@mui/material";

interface Props {
  align?: string | "center";
  justify?: string | "start";
  text: string;
}

function MultiuseText(props: Props) {
  return (
    <Grid className="multiuse-text-container" container flexDirection={"row"} alignItems={props.align} justifyContent={props.justify}>
      <span className="multiuse-text">
        { props.text }
      </span>
    </Grid> 
  );
}

export default MultiuseText;
