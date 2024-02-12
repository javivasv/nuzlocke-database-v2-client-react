import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CustomError } from "../../interfaces/interfaces";
import { Grid } from "@mui/material";
import InfoActionsCard from "../InfoActions/InfoActionsCard";
import Nuzlockes from "../InfoActions/Nuzlockes";
import NuzlockeForm from "../InfoActions/NuzlockeForm";
import Nuzlocke from "../InfoActions/Nuzlocke";
import PokemonForm from "../InfoActions/PokemonForm";

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function SecondaryContent(props: Props) {
  const location = useLocation();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke);

  const InfoActionCard = () => {
    const pathSplit = location.pathname.split("/").filter(Boolean);

    if (pathSplit.length === 1) {
      return <Nuzlockes GoTo={props.GoTo} />;
    } else {
      if (pathSplit.includes("nuzlocke-form")) {
        return <NuzlockeForm />;
      } else if (pathSplit.includes("pokemon") || pathSplit.includes("pokemon-form")) {
        return (
          nuzlocke &&
          <PokemonForm ValidateError={props.ValidateError} GoTo={props.GoTo} />
        );
      } else {
        return (
          nuzlocke &&
          <Nuzlocke ValidateError={props.ValidateError} GoTo={props.GoTo} />
        )
      }
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
