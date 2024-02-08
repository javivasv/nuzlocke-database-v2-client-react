import { useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Grid, TextField } from "@mui/material";
import NuzlockeRow from "./NuzlockeRow";

function NuzlockesTable() {
  const nuzlockes = useSelector((state: RootState) => state.nuzlockes.nuzlockes);
  const [search, setSearch] = useState("");

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

  const tableContentStyle = {
    maxHeight: window.innerHeight - 172 + "px",
  }

  const HandleSearchChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  return (
    <>
      <Grid className="search-row" container flexDirection={"row"}>
        <TextField
          value={search}
          name="search"
          placeholder="Search"
          variant="outlined"
          fullWidth
          size='small'
          color='secondary'
          onChange={HandleSearchChange}
        />
      </Grid>
      <Grid container flexDirection={"row"}>
        <Grid container item flexDirection={"column"}>
          <Grid className="table-header" container item flexDirection={"row"}>
            {
              headers.map(header => (
                <Grid key={header.name} container item flexDirection={"column"} xs={header.cols}>
                  <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                    <span className="header-text">
                      { header.text }
                    </span>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
          <Grid container item flexDirection={"row"}>
            <Grid className="thin-scrollbar" container item flexDirection={"column"} wrap="nowrap" style={tableContentStyle}>
              {
                nuzlockes.map(nuzlocke => (
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
