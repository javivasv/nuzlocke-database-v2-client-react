import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomError } from '../../interfaces/interfaces';
import { AppDispatch, RootState } from '../../store/store';
import { fetchNuzlockes, setNuzlockes } from '../../store/nuzlockes/nuzlockesSlice';
import { showSnackbar } from '../../store/notifications/notificationsSlice';
import { Grid, Card } from "@mui/material";
import NuzlockesTable from "./NuzlockesTable";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Nuzlockes(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (nuzlockes.length === 0) {
      setLoading(true);

      dispatch(fetchNuzlockes())
        .unwrap()
        .then(res => {
          dispatch(setNuzlockes(res.nuzlockes));
        })
        .catch(error => {
          dispatch(showSnackbar(error.msg));
          props.ValidateError(error.status);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <NuzlockesTable loading={loading} />
      </Card>
    </Grid>
  );
}

export default Nuzlockes;
