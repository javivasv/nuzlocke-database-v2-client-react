import { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import { AppDispatch, RootState } from "../../store/store";
import { fetchNuzlocke, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { fetchPokemonList, fetchAbilitiesList, fetchPokemon, setPokemonList, setAbilitiesList } from "../../store/pokeapi/pokeapiSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { Grid, Card, TextField, Button, FormControlLabel, Checkbox, Autocomplete, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Name, CustomError } from "../../interfaces/interfaces";
import MultiuseText from "../MultiuseText";
import LoadingRow from "../LoadingRow";

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function PokemonForm(props: Props) {
  const { nuzlockeId } = useParams();
  const { pokemonId } = useParams();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const pokemonList = useSelector((state: RootState) => state.pokeapi.pokemon);
  const abilitiesList = useSelector((state: RootState) => state.pokeapi.abilities);
  const pokemonTypeFilters = useSelector((state: RootState) => state.filters.pokemonTypeFilters);
  const dispatch = useDispatch<AppDispatch>()

  const defaultSpecies = {
    codedName: "bulbasaur",
    formattedName: "Bulbasaur",
  }

  const defaultAbility = {
    codedName: "overgrow",
    formattedName: "Overgrow",
  }

  const defaultObtained = "Caught";

  const [loading, setLoading] = useState(false);
  const [loadingPokemonList, setLoadingPokemonList] = useState(false);
  const [loadingPokemonData, setLoadingPokemonData] = useState(false);
  const [loadingPokemonAbilities, setLoadingPokemonAbilities] = useState(false);
  const [originalSpecies, setOriginalSpecies] = useState(false);  

  const [species, setSpecies] = useState(defaultSpecies);

  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const [obtained, setObtained] = useState(defaultObtained);
  const [sprite, setSprite] = useState("");
  //const [fainted, setFainted] = useState(false);
  const [typesFirst, setTypesFirst] = useState("");
  const [typesSecond, setTypesSecond] = useState("");
  const [originalAbility, setOriginalAbility] = useState(false);

  const [ability, setAbility] = useState(defaultAbility);

  const [normalSpriteUrl, setNormalSpriteUrl] = useState("");
  const [shinySpriteUrl, setShinySpriteUrl] = useState("");
  const [shiny, setShiny] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const obtainedOptions = ["Caught", "Gifted", "Hatched", "Traded", "Not"]

  const [speciesError, setSpeciesError] = useState('');
  const [locationError, setLocationError] = useState('');

  const validationSchema = Yup.object({
    species: Yup.string().required('Species is required'),
    location: Yup.string().required('Location is required'),
  });

  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      return '';
    } catch (error) {
      return (error as Yup.ValidationError).message;
    }
  };

  const validateForm = async () => {
    const speciesError = await validateField('species', species.codedName);
    const locationError = await validateField('location', location);

    setSpeciesError(speciesError);
    setLocationError(locationError);

    return !speciesError && !locationError;
  };

  useEffect(() => {
    if (pokemonId) {
      setEditMode(true);
    }

    if (!nuzlocke) {
      dispatch(fetchNuzlocke(nuzlockeId!))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));

          if (editMode) {
            console.log("EDIT MODE");
          }
        })
        .catch(error => {
          props.ValidateError(error);
        });
    } else {
      if (editMode) {
        console.log("EDIT MODE");
      }
    }

    if (abilitiesList.length === 0) {
      setLoadingPokemonAbilities(true);

      dispatch(fetchAbilitiesList())
        .unwrap()
        .then(res => {
          dispatch(setAbilitiesList(res.list));
        })
        .catch(() => {
          dispatch(showSnackbar("An error occured during the process"));
        })
        .finally(() => {
          setLoadingPokemonAbilities(false);
        });
    }

    if (pokemonList.length === 0) {
      setLoadingPokemonList(true);

      dispatch(fetchPokemonList())
        .unwrap()
        .then(res => {
          dispatch(setPokemonList(res.list));
          DefaultPokemon();
        })
        .catch(() => {
          dispatch(showSnackbar("An error occured during the process"));
        })
        .finally(() => {
          setLoadingPokemonList(false);
        });
    } else {
      DefaultPokemon();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSprite(shiny ? shinySpriteUrl : normalSpriteUrl);
  }, [shiny, shinySpriteUrl, normalSpriteUrl]);

  const DefaultPokemon = async () => {
    if (!editMode) {      
      setSpecies(defaultSpecies);
      setAbility(defaultAbility);
      FetchPokemonData(defaultSpecies.codedName);
    }
  }

  const FetchPokemonData = async (species: string) => {
    setLoadingPokemonData(true);

    dispatch(fetchPokemon(species))
      .unwrap()
      .then(res => {
        // Set the sprites URLs (normal and shiny)
        setNormalSpriteUrl(res.sprites.front_default ? res.sprites.front_default : "");
        setShinySpriteUrl(res.sprites.front_shiny ? res.sprites.front_shiny : "");

        // Set shiny
        if (editMode) {
          setShiny(shinySpriteUrl === sprite);
        }

        // Set shiny as false if there is no sprite URL
        if (shinySpriteUrl === "") {
          setShiny(false);
        }

        // Set the types of the pokemon
        if (!editMode) {
          const firstType = pokemonTypeFilters.find((type) => type.name.toLowerCase() === res.types[0].type.name) || pokemonTypeFilters[0];
          setTypesFirst(firstType.name); 

          if (res.types[1]) {
            const secondType = pokemonTypeFilters.find((type) => type.name.toLowerCase() === res.types[1].type.name) || pokemonTypeFilters[0];
            setTypesSecond(secondType.name); 
          } else {
            setTypesSecond(""); 
          }
        }

        // Set a default ability for the pokemon
        if (!editMode) {
          if (res.abilities && res.abilities[0]) {
            const ability = abilitiesList.find((ability: Name) => ability.codedName === res.abilities[0].ability.name);

            if (ability) {
              setAbility(ability);
            }
          }
        }
      })
      .catch(() => {
        dispatch(showSnackbar("An error occured during the process"));
      })
      .finally(() => {
        setLoadingPokemonData(false);
      });
  };

  const HandleShinyChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setShiny(target.checked)
    setSprite(shiny ? shinySpriteUrl : normalSpriteUrl);
  }

  const HandleSpeciesChange = async (_e: SyntheticEvent, species: Name) => {
    setSpecies(species);
    FetchPokemonData(species.codedName);
  }

  const HandleOriginalSpeciesNameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setSpecies({
      codedName: target.value,
      formattedName: target.value,
    });
  }

  const HandleOriginalSpeciesChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setOriginalSpecies(target.checked);

    if (target.checked) {
      setSpecies({
        codedName: "",
        formattedName: "",
      });
  
      setSprite("");
      setNormalSpriteUrl("");
      setShinySpriteUrl("");
      setShiny(false);
    } else {
      setSpecies(defaultSpecies);
      FetchPokemonData(defaultSpecies.codedName);
    }
  }

  const HandleTypesFirstChange = async (e: SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTypesFirst(target.value);
  }

  const HandleTypesSecondChange = async (e: SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTypesSecond(target.value);
  }

  const FilteredTypesSelection = (type: string) => {
    if (type === "first") {
      if (typesSecond !== "") {
        return pokemonTypeFilters.filter(
          (type) => type.name !== typesSecond
        );
      }

      return pokemonTypeFilters;
    }

    return pokemonTypeFilters.filter(
      (type) => type.name !== typesFirst
    );
  }

  const HandleOriginalAbilityNameChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setAbility({
      codedName: target.value,
      formattedName: target.value,
    });
  }

  const HandleAbilityChange = async (_e: SyntheticEvent, ability: Name) => {
    setAbility(ability);
  }

  const HandleOriginalAbilityChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setOriginalAbility(target.checked);

    if (target.checked) {
      setAbility({
        codedName: "",
        formattedName: "",
      });
    } else {
      setAbility(defaultAbility);
    }
  }

  const HandleNicknameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setNickname(target.value);
  }

  const HandleLocationChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setLocation(target.value);
  }

  const HandleObtainedChange = async (e: SelectChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setObtained(target.value);
  }

  const HandleSubmitPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    const data = {
      nuzlockeId,
      pokemon: {
        originalSpecies,
        species,
        nickname,
        location,
        obtained,
        sprite,
        types: {
          first: typesFirst,
          second: typesSecond,
        },
        originalAbility,
        ability,
      }
    }

    if (editMode) {
      console.log("EDIT MODE");
    } else {
      console.log("DATA: ", data);
      setLoading(false);
    }
  }

  return (
    <Grid container flexDirection={"row"} alignItems="center" justifyContent="center">
      <Card className='main-content-card'>
        <form className="w-100" noValidate onSubmit={HandleSubmitPokemon}>
          <Grid container item flexDirection={"column"}>
            {
              loadingPokemonData &&
              <LoadingRow />
            }
            {
              (!loadingPokemonData && Boolean(sprite)) &&
              <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                <img src={sprite} height="150px" />
              </Grid>
            }
            {
              Boolean(shinySpriteUrl) &&
              <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                <FormControlLabel control={<Checkbox checked={shiny} color="secondary" onChange={HandleShinyChange} />} label="Shiny" sx={{ margin: "0" }} />
              </Grid>
            }
            <MultiuseText text="Species" />
            <Grid className="form-input-row" container item flexDirection={"row"} alignItems="center" justifyContent="center">
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 9 : 12}>
                {
                  loadingPokemonList &&
                  <LoadingRow />
                }
                {
                  !loadingPokemonList && (
                    <>
                      {
                        originalSpecies &&
                        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                          <TextField
                            value={species.codedName}
                            name="species"
                            variant="outlined"
                            fullWidth
                            size='small'
                            color='secondary'
                            disabled={loading}
                            error={Boolean(speciesError)}
                            helperText={speciesError}
                            onChange={HandleOriginalSpeciesNameChange}
                          />
                        </Grid>
                      }
                      {
                        (!originalSpecies && pokemonList.length > 0) &&
                        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                          <Autocomplete
                            value={species}
                            fullWidth
                            disableClearable
                            disabled={loading}
                            options={pokemonList}
                            getOptionLabel={(option: Name) => option.formattedName}
                            isOptionEqualToValue={(option: Name, value: Name) => { return option.codedName === value.codedName }}
                            renderOption={(props, option) => (
                              <li {...props}>{option.formattedName}</li>
                            )}
                            renderInput={(params) => <TextField {...params} name="species" size='small' color="secondary" error={Boolean(speciesError)} helperText={speciesError} />}
                            onChange={HandleSpeciesChange}
                          />
                        </Grid>
                      }
                    </>
                  )
                }
              </Grid>
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 3 : 12}>
                <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={originalSpecies} color="secondary" onChange={HandleOriginalSpeciesChange} />} label={"Original species"} sx={{ margin: "0" }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <Grid container item flexDirection={"column"} xs={6}>
                <MultiuseText text="First type" />
                <Grid className="type-row first" container item flexDirection={"row"}>
                  <Select
                    value={typesFirst}
                    fullWidth
                    size='small'
                    color='secondary'
                    onChange={HandleTypesFirstChange}
                  >
                    {
                      FilteredTypesSelection("first").map((type) => (
                        <MenuItem key={type.name} value={type.name}>
                          { type.name }
                        </MenuItem>
                      ))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid container item flexDirection={"column"} xs={6}>
                <MultiuseText text="Second type" />
                <Grid className="type-row second" container item flexDirection={"row"}>
                  <Select
                    value={typesSecond}
                    fullWidth
                    size='small'
                    color='secondary'
                    onChange={HandleTypesSecondChange}
                  >
                    {
                      FilteredTypesSelection("second").map((type) => (
                        <MenuItem key={type.name} value={type.name}>
                          { type.name }
                        </MenuItem>
                      ))
                    }
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <MultiuseText text="Ability" />
            <Grid className="form-input-row" container item flexDirection={"row"} alignItems="center" justifyContent="center">
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 9 : 12}>
                {
                  loadingPokemonAbilities &&
                  <LoadingRow />
                }
                {
                  !loadingPokemonAbilities && (
                    <>
                      {
                        originalAbility &&
                        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                          <TextField
                            value={ability.codedName}
                            variant="outlined"
                            fullWidth
                            size='small'
                            color='secondary'
                            disabled={loading}
                            onChange={HandleOriginalAbilityNameChange}
                          />
                        </Grid>
                      }
                      {
                        (!originalAbility && abilitiesList.length > 0) &&
                        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                          <Autocomplete
                            value={ability}
                            fullWidth
                            disableClearable
                            disabled={loading}
                            options={abilitiesList}
                            getOptionLabel={(option: Name) => option.formattedName}
                            isOptionEqualToValue={(option: Name, value: Name) => { return option.codedName === value.codedName }}
                            renderOption={(props, option) => (
                              <li {...props}>{option.formattedName}</li>
                            )}
                            renderInput={(params) => <TextField {...params} size='small' color="secondary" />}
                            onChange={HandleAbilityChange}
                          />
                        </Grid>
                      }
                    </>
                  )
                }
              </Grid>
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 3 : 12}>
                <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={originalAbility} color="secondary" onChange={HandleOriginalAbilityChange} />} label={"Original ability"} sx={{ margin: "0" }} />
                </Grid>
              </Grid>
            </Grid>
            <MultiuseText text="Nickname" />
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <TextField
                value={nickname}
                variant="outlined"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                onChange={HandleNicknameChange}
              />
            </Grid>
            <MultiuseText text="Location" />
            <Grid className="form-input-row" container item flexDirection={"row"}>
              <TextField
                value={location}
                name="location"
                variant="outlined"
                fullWidth
                size='small'
                color='secondary'
                disabled={loading}
                error={Boolean(locationError)}
                helperText={locationError}
                onChange={HandleLocationChange}
              />
            </Grid>
            <MultiuseText text="Obtained" />
            <Grid container item flexDirection={"row"}>
              <Select
                value={obtained}
                fullWidth
                size='small'
                color='secondary'
                onChange={HandleObtainedChange}
              >
                {
                  obtainedOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      { option }
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
            <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
              <Button color='secondary' variant='contained' disabled={loading} type="submit">
                { editMode ? "Update pokemon" : "Add nuzlocke" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}

export default PokemonForm;