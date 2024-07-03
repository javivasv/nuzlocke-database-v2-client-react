import { Grid, Card } from "@mui/material";
import Feedback from "./Feedback";
import CustomCardContent from '../CustomCardContent';
import MultiuseText from "../MultiuseText";

interface Props {
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  const websites = [
    {
      name: "Personal website",
      url: "https://javivasv.com/",
    },
    {
      name: "Buy Me a Coffee",
      url: "https://www.buymeacoffee.com/javivasv",
    },
    {
      name: "Github",
      url: "https://github.com/javivasv",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/javier-vivas-veliz/",
    },
  ];

  return (
    <>
      <Grid className={props.isMdAndUp ? "" : "only-content-second-half"} container flexDirection={"row"}>
        <Card className='secondary-content-card top-card'>
          <MultiuseText text="Feedback" justify="center" />
          <Feedback />
        </Card>
      </Grid>
      <Grid container flexDirection={"row"}>
        <Card className='secondary-content-card'>
          <MultiuseText text="Contact" justify="center" />
          <CustomCardContent>
            {
              websites.map(website => (
                <Grid key={website.url} className="card-text-row" container flexDirection={"row"} justifyContent="center">
                  <a
                    className="website-link"
                    href={website.url}
                    target="_blank"
                  >
                    { website.name }
                  </a>
                </Grid>
              ))
            }
          </CustomCardContent>
        </Card>
      </Grid>
    </>
  );
}
  
export default SecondaryContent;
  