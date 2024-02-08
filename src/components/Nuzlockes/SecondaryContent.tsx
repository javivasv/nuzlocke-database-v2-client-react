import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import InfoActionsCard from "../InfoActions/InfoActionsCard";
import Nuzlockes from "../InfoActions/Nuzlockes";
import NuzlockeForm from "../InfoActions/NuzlockeForm";

interface Props {
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  const location = useLocation();

  const InfoActionCard = () => {
    const pathSplit = location.pathname.split("/");
    const path = pathSplit[pathSplit.length - 1];

    switch(path) {
    case "nuzlockes":
      return <Nuzlockes GoTo={props.GoTo} />;
    case "nuzlocke-form":
      return <NuzlockeForm />;
    default:
      return <Nuzlockes GoTo={props.GoTo} />;
    }
  }

  return (
    <Grid className={props.isMdAndUp ? "" : "only-content-second-half"} container flexDirection={"row"}>
      <InfoActionsCard>
        { InfoActionCard() }
      </InfoActionsCard>
    </Grid>
  );
}

export default SecondaryContent;
