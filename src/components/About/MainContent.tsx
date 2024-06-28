import { Grid, Card } from "@mui/material";
import CustomCardHeader from "../CustomCardHeader";
import CustomCardContent from "../CustomCardContent";

function MainContent() {
  return (
    <Grid container flexDirection={"row"}>
      <Card className='main-content-card top-card'>
        <CustomCardHeader title="About" />
        <CustomCardContent>
          My name is Javier Vivas and I am a Computer/Software Engineer graduated
          at Universidad Simón Bolívar in Caracas, Venezuela. I live in the USA
          and currently work as a Frontend Engineer.
        </CustomCardContent>
        <CustomCardContent>
          In 2020 I got to know what a nuzlocke is from videos on Youtube. At
          first I did not know how people liked it, but it grew on me over time
          and I really enjoy it now. I have done a couple myself, some finished,
          some lost, but either way, in the end, is very fun to play them. I
          started following some Youtubers and learning and getting better because
          of them.
        </CustomCardContent>
        <CustomCardContent>
          As I played, I found uncomfortable to keep track of my nuzlockes. I
          decided to develop an app that would meet my needs as a player and that
          can be as inclusive as possible in terms of different types of games a
          player can play. At first I thought of providing lists of locations and
          encounters based on the games, but that ended up restricting the players'
          freedom to play the nuzlocke with the rules they wanted to play with.
          In the end, I decided to let the player type manually some of the
          information in order to make it as free as possible. This gives the player
          the opportunity to keep track of any nuzlocke of any type of Pokemon game.
        </CustomCardContent>
        <CustomCardContent>
          <span>
            This is a side project that I made on my free time, however, I would
            appreciate any donation that could be done in order to try and keep the
            site running and updated. You can do so here:&nbsp;
            <a
              className="website-link"
              href="https://www.buymeacoffee.com/javivasv"
              target="_blank"
            >
              Buy Me a Coffee
            </a>
            .
          </span>
        </CustomCardContent>
      </Card>
      <Card className='main-content-card top-card'>
        <CustomCardContent>
          <span>
            Pokemon sprites, Pokemon names, Pokemon types and Pokemon abilities are
            taken from&nbsp;
            <a
              className="website-link"
              href="https://pokeapi.co/docs/v2"
              target="_blank"
            >
              PokeAPI V2
            </a>
            , a website dedicated to provide data related to the Pokemon franchise.
          </span>
        </CustomCardContent>
        <CustomCardContent>
          <span>
            Nuzlocke rules and general information are taken from&nbsp;
            <a
              className="website-link"
              href="https://bulbapedia.bulbagarden.net/wiki/Main_Page"
              target="_blank"
            >
              Bulbapedia
            </a>
            .
          </span>
        </CustomCardContent>
        <CustomCardContent>
          <span>
            Login background art was made by&nbsp;
            <a
              className="website-link"
              href="https://openai.com/"
              target="_blank"
            >
              OpenAI
            </a>
            .
          </span>
        </CustomCardContent>
      </Card>
      <Card className='main-content-card'>
        <CustomCardContent>
          This website/app is a fan-made project and is not affiliated with,
          endorsed, sponsored, or specifically approved by Nintendo, Game Freak,
          or The Pokémon Company. Pokémon and its trademarks are the property of
          Nintendo, Game Freak, and The Pokémon Company.
        </CustomCardContent>
      </Card>
    </Grid>
  );
}

export default MainContent;
