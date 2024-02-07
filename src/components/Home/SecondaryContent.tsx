import { Grid, Card } from "@mui/material";
import CustomCardContent from "../CustomCardContent";
import MultiuseText from "../MultiuseText";

function SecondaryContent() {
  return (
    <Grid container flexDirection={"row"}>
      <Card className='secondary-content-card top-card'>
        <MultiuseText text="Nuzlocke Basic Rules" justify="center"></MultiuseText>
        <CustomCardContent text="
          Any Pokémon that faints is considered dead, and must be released
          or put in the Pokémon Storage System permanently (or may be
          transferred to another game, as long as the Pokémon is never able
          to be used again during this run)."
        ></CustomCardContent>
        <CustomCardContent text="
          The player may only catch the first wild Pokémon encountered in
          each area, and none else. If the first wild Pokémon encountered
          faints or flees, there are no second chances. If the first
          encounter in the area is a double battle, the player is free to
          choose which of the two wild Pokémon they would like to catch but
          may only catch one of them. This restriction does not apply to
          Pokémon able to be captured during static encounters, nor to Shiny
          Pokémon"
        ></CustomCardContent>
      </Card>
      <Card className='secondary-content-card'>
        <MultiuseText text="Commonly accepted extra rules" justify="center"></MultiuseText>
        <CustomCardContent text="
          The two basic rules are not in effect until the player has gained
          their first Poké Balls and thus the ability to catch Pokémon"
        ></CustomCardContent>
        <CustomCardContent text="
          The player must nickname all of their Pokémon, for the sake of
          forming stronger emotional bonds"
        ></CustomCardContent>
        <CustomCardContent text="
          Species/Dupes Clause: The 'first wild Pokémon in each area' rule
          does not apply in an area until a species or evolution line is
          encountered that has not been caught yet"
        ></CustomCardContent>
        <CustomCardContent text="
          Shiny Clause: Shiny Pokémon do not need to be released if they faint"
        ></CustomCardContent>
        <CustomCardContent text="
          If the player has no Pokémon that can use a field move that is
          required to continue the game, they may catch another Pokémon that
          can learn the required field move. However, this Pokémon cannot be
          used in battle for any reason, and must be released, permanently put
          into a PC box, or migrated as soon as it is no longer needed or if
          the player catches another Pokémon that can use this field move"
        ></CustomCardContent>
      </Card>
    </Grid>
  );
}
  
export default SecondaryContent;
  