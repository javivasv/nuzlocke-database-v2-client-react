import { useState, SyntheticEvent, MouseEvent } from "react";
import { Grid, TextField, InputAdornment, IconButton, Menu } from "@mui/material";
import { Search, FilterList, Settings } from '@mui/icons-material';
import FiltersMenu from "./FiltersMenu";
import SettingsMenu from "./SettingsMenu";

function PokemonTable() {
  const [search, setSearch] = useState("");

  const HandleSearchChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null);
  const openFilters = Boolean(filtersAnchorEl);

  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const openSettings = Boolean(settingsAnchorEl);

  const HandleOpenFilters = (event: MouseEvent<HTMLButtonElement>) => {
    setFiltersAnchorEl(event.currentTarget);
  };

  const HandleCloseFilters = () => {
    setFiltersAnchorEl(null);
  };

  const HandleOpenSettings = (event: MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const HandleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  return (
    <Grid container flexDirection={"row"}>
      <Grid container item flexDirection={"column"}>
        <Grid className="search-row in-tab" container item flexDirection={"row"}>
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
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={HandleSearchChange}
          />
          <IconButton className="search-extra-action-button" onClick={HandleOpenFilters}>
            <FilterList />
          </IconButton>
          <Menu
            className="menu-container"
            anchorEl={filtersAnchorEl}
            open={openFilters}
            onClose={HandleCloseFilters}
          >
            <FiltersMenu />
          </Menu>
          <IconButton className="search-extra-action-button" onClick={HandleOpenSettings}>
            <Settings />
          </IconButton>
          <Menu
            className="menu-container"
            anchorEl={settingsAnchorEl}
            open={openSettings}
            onClose={HandleCloseSettings}
          >
            <SettingsMenu />
          </Menu>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PokemonTable;
