import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Grid, Card } from "@mui/material";
import CustomCardHeader from '../CustomCardHeader';
import NuzlockesTable from "./NuzlockesTable";

function Nuzlockes() {
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <Grid container flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            {
              nuzlockes.length === 0 && 
              <Grid container item flexDirection={"row"}>
                <CustomCardHeader title="There are no nuzlockes registered yet" />
              </Grid>
            }
            {
              nuzlockes.length > 0 &&
              <NuzlockesTable />
            }
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Nuzlockes;
