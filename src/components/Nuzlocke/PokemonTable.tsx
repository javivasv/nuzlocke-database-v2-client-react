import { useState, SyntheticEvent, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CustomError } from "../../interfaces/interfaces";
import { Grid, TextField, InputAdornment, IconButton, Menu } from "@mui/material";
import { Search, FilterList, Settings } from '@mui/icons-material';
import FiltersMenu from "./FiltersMenu";
import SettingsMenu from "./SettingsMenu";
import TableHeaders from "../TableHeaders";
import PokemonRow from "./PokemonRow";

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function PokemonTable(props: Props) {
  const pokemon = useSelector((state: RootState) => (state.nuzlockes.nuzlocke!).pokemon);
  const statusFilters = useSelector((state: RootState) => state.filters.statusFilters).filter(filter => filter.on).map(filter => filter.value);
  const obtainedFilters = useSelector((state: RootState) => state.filters.obtainedFilters).filter(filter => filter.on).map(filter => filter.value);
  const pokemonTypeFilters = useSelector((state: RootState) => state.filters.pokemonTypeFilters).filter(filter => filter.on).map(filter => filter.value);
  const [search, setSearch] = useState("");
  const [filtersAnchorEl, setFiltersAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(null);
  const openFilters = Boolean(filtersAnchorEl);
  const openSettings = Boolean(settingsAnchorEl);

  const tableContentStyle = {
    maxHeight: window.innerHeight - 296 + "px",
  }

  const headers = [
    {
      name: "sprite",
      text: "",
      cols: 2,
    },
    {
      name: "nickname",
      text: "Nickname",
      cols: 2,
    },
    {
      name: "ability",
      text: "Ability",
      cols: 2,
    },
    {
      name: "location",
      text: "Location",
      cols: 2,
    },
    {
      name: "obtained",
      text: "Obtained",
      cols: 2,
    },
    {
      name: "status",
      text: "Status",
      cols: 2,
    },
  ];

  const FilteredHeaders = () => {
    if (props.isMdAndUp) {
      return headers;
    }

    return headers.filter(header => header.name !== "ability" && header.name !== "obtained").map(header => ({ ...header, cols: 3 }));
  }

  const FilteredPokemon = () => {
    const pokemonList = pokemon.filter(pokemonInst => {
      // Filter by search word
      if (
        search !== "" &&
        !pokemonInst.nickname.toLowerCase().includes(search) &&
        !pokemonInst.species.formattedName.toLowerCase().includes(search) &&
        !pokemonInst.location.toLowerCase().includes(search)
      ) {
        return false;
      }

      // Filter by status
      if (statusFilters.length > 0) {
        if (!pokemonInst.fainted && !statusFilters.includes("alive")) {
          return false;
        }

        if (pokemonInst.fainted && !statusFilters.includes("fainted")) {
          return false;
        }
      }

      // Filter by obtained
      if (
        obtainedFilters.length > 0 &&
        !obtainedFilters.includes(pokemonInst.obtained)
      ) {
        return false;
      }

      // Filter by type
      if (
        pokemonTypeFilters.length > 0 &&
        !pokemonTypeFilters.includes(pokemonInst.types.first)
      ) {
        if (pokemonInst.types.second === "") {
          return false;
        }

        if (!pokemonTypeFilters.includes(pokemonInst.types.second)) {
          return false;
        }
      }

      return true;
    })
    
    return pokemonList;
  }

  const HandleSearchChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  }

  const HandleOpenFilters = (e: MouseEvent<HTMLButtonElement>) => {
    setFiltersAnchorEl(e.currentTarget);
  };

  const HandleCloseFilters = () => {
    setFiltersAnchorEl(null);
  };

  const HandleOpenSettings = (e: MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(e.currentTarget);
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
        <Grid container item flexDirection={"row"}>
          <Grid container item flexDirection={"column"}>
            <TableHeaders headers={FilteredHeaders()} />
            <Grid container item flexDirection={"row"}>
              <Grid className="thin-scrollbar" container item flexDirection={"column"} wrap="nowrap" style={tableContentStyle}>
                {
                  FilteredPokemon().map(pokemon => (
                    <Grid key={pokemon._id} container item flexDirection={"row"}>
                      <PokemonRow ValidateError={props.ValidateError} GoTo={props.GoTo} isMdAndUp={props.isMdAndUp} pokemon={pokemon} />
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PokemonTable;
