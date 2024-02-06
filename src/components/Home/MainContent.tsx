import { Grid, Card } from "@mui/material";
import CustomCardHeader from "../CustomCardHeader";
import CustomCardContent from "../CustomCardContent";
import MultiuseText from "../MultiuseText";

function MainContent() {


  return (
    <Grid container flexDirection={"row"}>
      <Card className='home-main-content-card top-card'>
        <CustomCardHeader title="Welcome to the Nuzlocke DataBase!"></CustomCardHeader>
        <CustomCardContent text="
          Here you can keep track of all of your pokemon nuzlockes. You will be
          able to register a nuzlocke of a preexisting game, a romhack or a
          completely original game. You will also be able to register every
          pokemon you obtain (or not) during the run, as well as change its status
          (alive or fainted), in order to keep it organized and updated."
        ></CustomCardContent>
        <MultiuseText text="What is a nuzlocke?" justify="center"></MultiuseText>
        <CustomCardContent text="
          A nuzlocke is a set of rules intended to create a higher level of
          difficulty while playing the Pokémon games. Many challengers feel that
          the rules also serve the purpose of encouraging the use of Pokémon the
          player would not normally choose, and promoting closer bonds with the
          player's Pokémon. The rules are not an in-game function, but are
          self-imposed on the part of the player, and thus subject to variation."
        ></CustomCardContent>
      </Card>
      <Card className='home-main-content-card'>
        <CustomCardHeader title="Relevant Nuzlocke Videos"></CustomCardHeader>
      </Card>
    </Grid>
  );
}
  
export default MainContent;
  