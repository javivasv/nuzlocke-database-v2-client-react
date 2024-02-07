import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Grid } from "@mui/material";
import LoadingRow from "../LoadingRow";
import CustomCardHeader from '../CustomCardHeader';

interface Props {
  loading: boolean,
}

function NuzlockesTable(props: Props) {
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);

  return (
    <Grid container flexDirection={"row"}>
      <Grid container item flexDirection={"column"}>
        {
          props.loading &&
          <LoadingRow />
        }
        {
          (!props.loading && nuzlockes.length === 0) && 
          <Grid container flexDirection={"row"}>
            <CustomCardHeader title="There are no nuzlockes registered yet"></CustomCardHeader>
          </Grid>
        }
      </Grid>
    </Grid>
  );
}

export default NuzlockesTable;
