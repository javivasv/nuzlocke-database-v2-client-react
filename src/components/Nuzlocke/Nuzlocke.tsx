import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchNuzlocke, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { CustomError } from '../../interfaces/interfaces';
import { Grid, Card, Tabs, Tab } from "@mui/material";
import LoadingRow from '../LoadingRow';

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Nuzlockes(props: Props) {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke);

  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState(0);

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

  const HandleTabChange = (val: number) => {
    setTab(val);
  }

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <Grid container flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            <Grid container flexDirection={"row"}>
              <Tabs value={tab} onChange={(_, val) => HandleTabChange(val)} aria-label="basic tabs example">
                <Tab label="Pokemon" />
              </Tabs>
            </Grid>
            {
              loading &&
              <Grid container flexDirection={"row"}>
                <LoadingRow />
              </Grid>
            }
            {
              !loading &&
              <Grid container flexDirection={"row"}>
                LOADED
              </Grid>
            }
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Nuzlockes;
