import { useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Nuzlocke } from "../../interfaces/interfaces";
import { Grid, TextField, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material';
import CustomCardHeader from "../CustomCardHeader";
import NuzlockeRow from "./NuzlockeRow";
import TableHeaders from "../TableHeaders";

function NuzlockesTable() {
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);
  const [search, setSearch] = useState("");

  const tableContentStyle = {
    maxHeight: window.innerHeight - 172 + "px",
  }

  const headers = [
    {
      name: "name",
      text: "Name",
      cols: 6,
    },
    {
      name: "game",
      text: "Game",
      cols: 3,
    },
    {
      name: "status",
      text: "Status",
      cols: 3,
    },
  ]

  const FilteredNuzlockes = () => {
    if (search === "") {
      return nuzlockes;
    }

    return nuzlockes.filter(
      (nuzlocke: Nuzlocke) =>
        nuzlocke.name.toLowerCase().includes(search) ||
        nuzlocke.game.toLowerCase().includes(search)
    );
  }

  const HandleSearchChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  return (
    <>
      <Grid className="search-row" container flexDirection={"row"}>
        <TextField
          className="search-input"
          value={search}
          name="search"
          placeholder="Search"
          variant="outlined"
          fullWidth
          size='small'
          color='secondary'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search data-testid="test-nuzlockes-search-icon" />
              </InputAdornment>
            ),
          }}
          onChange={HandleSearchChange}
        />
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid container item flexDirection={"column"}>
          <TableHeaders headers={headers} />
          <Grid container item flexDirection={"row"}>
            <Grid className="thin-scrollbar" container item flexDirection={"column"} wrap="nowrap" style={tableContentStyle}>
              {
                nuzlockes.length === 0 && 
                <Grid container item flexDirection={"row"}>
                  <CustomCardHeader title="There are no nuzlockes registered yet" />
                </Grid>

              }
              {
                nuzlockes.length > 0 &&
                FilteredNuzlockes().map(nuzlocke => (
                  <Grid key={nuzlocke._id} container item flexDirection={"row"}>
                    <NuzlockeRow nuzlocke={nuzlocke} />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default NuzlockesTable;
