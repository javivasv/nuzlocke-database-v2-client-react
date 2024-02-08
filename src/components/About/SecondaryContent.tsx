import { CustomError } from '../../interfaces/interfaces';
import { Grid, Card } from "@mui/material";
import MultiuseText from "../MultiuseText";
import Feedback from "./Feedback";

interface Props {
  ValidateError: (e: CustomError) => void;
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
    <Grid container flexDirection={"row"}>
      <Card className='secondary-content-card top-card'>
        <MultiuseText text="Feedback" justify="center"></MultiuseText>
        <Feedback ValidateError={props.ValidateError} />
      </Card>
      <Card className='secondary-content-card'>
        <MultiuseText text="Contact" justify="center"></MultiuseText>
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
      </Card>
    </Grid>
  );
}
  
export default SecondaryContent;
  