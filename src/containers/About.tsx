import { Grid } from "@mui/material";
import MainContent from "../components/About/MainContent";
import SecondaryContent from "../components/About/SecondaryContent";

function About() {
  return (
    <Grid className="h-100 w-100" container flexDirection={"row"}>
      <Grid className="main-content" container item flexDirection={"column"} xs={12} md={8}>
        <MainContent />
      </Grid>
      <Grid className="secondary-content" container item flexDirection={"column"} xs={12} md={4}>
        <SecondaryContent />
      </Grid>
    </Grid>
  );
}
    
export default About;
    