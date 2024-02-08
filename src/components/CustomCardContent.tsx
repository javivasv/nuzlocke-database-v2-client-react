import { Grid } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

function CustomCardContent(props: Props) {
  return (
    <Grid className="custom-card-content" container flexDirection={"row"} justifyContent="center">
      { props.children }
    </Grid>
  );
}
  
export default CustomCardContent;