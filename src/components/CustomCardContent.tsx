import { Grid } from "@mui/material";

interface Props {
  text: string;
}

function CustomCardContent(props: Props) {
  return (
    <Grid className="custom-card-content" container flexDirection={"row"} justifyContent="center">
      <span className="custom-card-content-text">
        {props.text}
      </span>
    </Grid>
  );
}
  
export default CustomCardContent;