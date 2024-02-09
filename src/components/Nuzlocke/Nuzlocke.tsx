import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { CustomError } from '../../interfaces/interfaces';
import { Grid, Card } from "@mui/material";
import { fetchNuzlocke, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Nuzlockes(props: Props) {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!nuzlocke || nuzlocke._id !== nuzlockeId) {
      dispatch(fetchNuzlocke(nuzlockeId!))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
        })
        .catch(error => {
          props.ValidateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <Grid container flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            <span>
              { loading }
            </span>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Nuzlockes;
