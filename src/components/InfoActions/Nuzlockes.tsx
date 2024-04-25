import { Grid, Button, Divider } from "@mui/material";
import MultiuseText from "../MultiuseText";
import CustomCardContent from "../CustomCardContent";
import useGoTo from '../../customHooks/useGoTo';

function Nuzlockes() {
  const goTo = useGoTo();

  const websites = [
    {
      name: "Bulbapedia",
      url: "https://bulbapedia.bulbagarden.net/wiki/Main_Page",
    },
    {
      name: "Pokemon Showdown Damage Calculator",
      url: "https://calc.pokemonshowdown.com",
    },
    {
      name: "Serebii",
      url: "https://www.serebii.net/index2.shtml",
    },
  ]

  const HandleClick = () => {
    goTo("nuzlockes/nuzlocke-form");
  }

  return (
    <>
      <CustomCardContent>
        <Button color="secondary" variant="contained" onClick={HandleClick}>
          New nuzlocke
        </Button>
      </CustomCardContent>
      <Divider className="horizontal-divider" />
      <MultiuseText text="Relevant websites" justify="center"/>
      <CustomCardContent>
        {
          websites.map(website => (
            <Grid key={website.url} className="card-text-row" container flexDirection={"row"} justifyContent="center">
              <a
                className="website-link"
                href={website.url}
                target="_blank"
              >
                {website.name}
              </a>
            </Grid>
          ))
        }
      </CustomCardContent>
    </>
  );
}

export default Nuzlockes;