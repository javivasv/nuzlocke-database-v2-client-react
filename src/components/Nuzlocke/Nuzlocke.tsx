import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchNuzlocke, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { CustomError } from '../../interfaces/interfaces';
import { Grid, Card, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CustomCardHeader from '../CustomCardHeader';
import LoadingRow from '../LoadingRow';
import PokemonTable from './PokemonTable';

interface Props {
  ValidateError: (e: CustomError) => void;
}

function Nuzlocke(props: Props) {
  const { nuzlockeId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke);

  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState("1");

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

  const HandleTabChange = (val: string) => {
    setTab(val);
  }

  return (
    ( nuzlocke &&
      <Grid container flexDirection={"row"}>
        <Card className="main-content-card">
          <Grid container flexDirection={"row"}>
            <Grid container item flexDirection={"column"}>
              <TabContext value={tab}>
                <Grid container flexDirection={"row"}>
                  <TabList onChange={(_, val) => HandleTabChange(val)}>
                    <Tab value="1" label="Pokemon" />
                  </TabList>
                </Grid>
                {
                  loading &&
                <Grid container flexDirection={"row"}>
                  <LoadingRow />
                </Grid>
                }
                {
                  (!loading && nuzlocke.pokemon.length === 0) && 
                  <Grid container item flexDirection={"row"}>
                    <CustomCardHeader title="There are no pokemon registered yet"></CustomCardHeader>
                  </Grid>
                }
                {
                  (!loading && nuzlocke.pokemon.length > 0) &&
                  <TabPanel value="1" sx={{ padding: "0" }}>
                    <PokemonTable />
                  </TabPanel>
                }
              </TabContext>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    )
  );
}

export default Nuzlocke;
