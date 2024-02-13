import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setStatusFilters, setObtainedFilters, setPokemonTypeFilters } from "../../store/filters/filtersSlice";
import { Grid, Card, Divider, FormControlLabel, Checkbox } from "@mui/material";
import MultiuseText from "../MultiuseText";

function FiltersMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const statusFilters = useSelector((state: RootState) => state.filters.statusFilters);
  const obtainedFilters = useSelector((state: RootState) => state.filters.obtainedFilters);
  const pokemonFilters = useSelector((state: RootState) => state.filters.pokemonTypeFilters);

  const HandleStatusFilterChange = (index: number) => {
    dispatch(setStatusFilters(index));
  };
  
  const HandleObtainedFilterChange = (index: number) => {
    dispatch(setObtainedFilters(index));
  };

  const HandlePokemonTypeFilterChange = (index: number) => {
    dispatch(setPokemonTypeFilters(index));
  };

  return (
    <Card className="menu-card">
      <MultiuseText text="Status filters" />
      <Grid container flexDirection={"row"}>
        {
          statusFilters.map((filter, index) => (
            <Grid key={filter.value} container item flexDirection={"column"} xs={4}>
              <FormControlLabel control={<Checkbox checked={filter.on} color="secondary" onChange={() => HandleStatusFilterChange(index)} />} label={filter.name} />
            </Grid>
          ))
        }
      </Grid>
      <Divider className="horizontal-divider" />
      <MultiuseText text="Obtained filters" />
      <Grid container flexDirection={"row"}>
        {
          obtainedFilters.map((filter, index) => (
            <Grid key={filter.value} container item flexDirection={"column"} xs={4}>
              <FormControlLabel control={<Checkbox checked={filter.on} color="secondary" onChange={() => HandleObtainedFilterChange(index)} />} label={filter.name} />
            </Grid>
          ))
        }
      </Grid>
      <Divider className="horizontal-divider" />
      <MultiuseText text="Type filters" />
      <Grid container flexDirection={"row"}>
        {
          pokemonFilters.map((filter, index) => (
            <Grid key={filter.value} container item flexDirection={"column"} xs={4}>
              <FormControlLabel control={<Checkbox checked={filter.on} sx={{
                '&:hover': {
                  backgroundColor: `${filter.color}20`,
                },
                '&.Mui-checked': {
                  color: filter.color,
                },
                '&.Mui-checked:hover': {
                  backgroundColor: `${filter.color}80`,
                },
              }}
              onChange={() => HandlePokemonTypeFilterChange(index)}
              />} label={filter.name} />
            </Grid>
          ))
        }
      </Grid>
    </Card>
  );
}

export default FiltersMenu;
