import { Grid } from "@mui/material";

interface Props {
  title: string;
}

function CustomCardHeader(props: Props) {
  return (
    <Grid className="custom-card-header" container flexDirection={"row"} justifyContent="center">
      <span className="custom-card-header-text">
        {props.title}
      </span>
    </Grid>
  );
}
  
export default CustomCardHeader;