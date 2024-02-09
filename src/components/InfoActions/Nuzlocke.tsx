import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Grid, Button, Divider } from "@mui/material";
import MultiuseText from "../MultiuseText";

interface Props {
  GoTo: (e: string) => void;
}

function Nuzlocke(props: Props) {
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;

  const GoToEditNuzlocke = () => {
    props.GoTo(`nuzlockes/nuzlocke/${nuzlocke._id}/nuzlocke-form`);
  }

  return (
    <>
      {
        nuzlocke && (
          <>
            <MultiuseText text={`${nuzlocke.name} - ${nuzlocke.game}`} justify="center" />
            <Divider sx={{ margin: "12px 0" }} />
            <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='secondary' variant='contained' onClick={GoToEditNuzlocke}>
                Update nuzlocke
              </Button>
            </Grid>
          </>
        )
      }
    </>
  );
}

export default Nuzlocke;