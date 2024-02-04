import { Grid } from "@mui/material";
import '../styles/MultiuseText.css'

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
