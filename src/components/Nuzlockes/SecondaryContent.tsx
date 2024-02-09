import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import InfoActionsCard from "../InfoActions/InfoActionsCard";
import Nuzlockes from "../InfoActions/Nuzlockes";
import NuzlockeForm from "../InfoActions/NuzlockeForm";
import Nuzlocke from "../InfoActions/Nuzlocke";

interface Props {
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  const location = useLocation();

  const InfoActionCard = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);

    if (pathSplit.length === 1) {
      return <Nuzlockes GoTo={props.GoTo} />;
    } else {
      if (pathSplit.includes("nuzlocke-form")) {
        return <NuzlockeForm />;
      } else {
        return <Nuzlocke GoTo={props.GoTo} />
      }
    }
    /*
    else if (path.includes("pokemon") || path.includes("pokemon-form")) {
      
    }
    */
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
