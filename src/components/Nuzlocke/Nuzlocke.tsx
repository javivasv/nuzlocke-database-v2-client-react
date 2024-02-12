import { useState, ChangeEvent } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Grid, Card, Tabs, Tab } from "@mui/material";
import CustomCardHeader from '../CustomCardHeader';
import PokemonTable from './PokemonTable';
import TabPanel from './TabPanel';

interface Props {
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function Nuzlocke(props: Props) {
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;

  const [tab, setTab] = useState(0);

  const HandleTabChange = (_event: ChangeEvent<unknown>, tab: number) => {
    setTab(tab);
  };

  return (
    <Grid container flexDirection={"row"}>
      <Card className="main-content-card">
        <Grid container flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            <Grid container flexDirection={"row"}>
              <Tabs value={tab} onChange={HandleTabChange}>
                <Tab label="Pokemon" />
              </Tabs>
            </Grid>
            {
              nuzlocke.pokemon.length === 0 && 
              <Grid container item flexDirection={"row"}>
                <CustomCardHeader title="There are no pokemon registered yet"></CustomCardHeader>
              </Grid>
            }
            {
              nuzlocke.pokemon.length > 0 &&
              <TabPanel value={tab} index={0}>
                <PokemonTable GoTo={props.GoTo} isMdAndUp={props.isMdAndUp} />
              </TabPanel>
            }             
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default Nuzlocke;
