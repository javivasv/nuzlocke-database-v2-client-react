import { Grid, Button, Divider } from "@mui/material";
import MultiuseText from "../MultiuseText";
import CustomCardContent from "../CustomCardContent";

interface Props {
  GoTo: (e: string) => void;
}

function Nuzlockes(props: Props) {
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
    props.GoTo("nuzlockes/nuzlocke-form");
  }

  return (
    <>
      <Grid className="info-actions-card-title" container flexDirection={"row"} alignItems="center" justifyContent="center">
        <Button color="secondary" variant="contained" onClick={HandleClick}>
          New nuzlocke
        </Button>
      </Grid>
      <Divider sx={{ margin: "12px 0" }} />
      <MultiuseText text="Relevant websites" justify="center"/>
      <CustomCardContent>
        {
          websites.map(website => (
            <Grid key={website.url} className="contact-link-row" container flexDirection={"row"} justifyContent="center">
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