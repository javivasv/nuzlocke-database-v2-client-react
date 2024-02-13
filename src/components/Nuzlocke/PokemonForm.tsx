import { useState, useEffect, SyntheticEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { AppDispatch, RootState } from "../../store/store";
import { setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { fetchPokemon } from "../../store/pokeapi/pokeapiSlice";
import { addPokemon, updatePokemon } from "../../store/pokemon/pokemonSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { Name, Pokemon, CustomError } from "../../interfaces/interfaces";
import { Grid, Card, TextField, Button, FormControlLabel, Checkbox, Autocomplete, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import MultiuseText from "../MultiuseText";
import LoadingRow from "../LoadingRow";

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
  editMode: boolean;
}

function PokemonForm(props: Props) {
  const { nuzlockeId, pokemonId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const pokemonList = useSelector((state: RootState) => state.pokeapi.pokemon);
  const abilitiesList = useSelector((state: RootState) => state.pokeapi.abilities);
  const pokemonTypeFilters = useSelector((state: RootState) => state.filters.pokemonTypeFilters);
  const [sprite, setSprite] = useState("");
  const [normalSpriteUrl, setNormalSpriteUrl] = useState("");
  const [shinySpriteUrl, setShinySpriteUrl] = useState("");
  const [shiny, setShiny] = useState(false);
  const [originalSpecies, setOriginalSpecies] = useState(false);  
  const [typesFirst, setTypesFirst] = useState("");
  const [typesSecond, setTypesSecond] = useState("");
  const [nickname, setNickname] = useState("");
  const [originalAbility, setOriginalAbility] = useState(false);
  const [noAbility, setNoAbility] = useState(false);
  const [location, setLocation] = useState("");
  const [fainted, setFainted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPokemonData, setLoadingPokemonData] = useState(false);
  const [speciesError, setSpeciesError] = useState('');
  const [locationError, setLocationError] = useState('');
  const obtainedOptions = ["Caught", "Gifted", "Hatched", "Traded", "Not"]

  const defaultSpecies = {
    codedName: "bulbasaur",
    formattedName: "Bulbasaur",
  }
  const [species, setSpecies] = useState(defaultSpecies);

  const defaultAbility = {
    codedName: "overgrow",
    formattedName: "Overgrow",
  }
  const [ability, setAbility] = useState(defaultAbility);

  const defaultObtained = "Caught";
  const [obtained, setObtained] = useState(defaultObtained);

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
    if (props.editMode) {
      FetchPokemonToEditData();
    } else {
      DefaultPokemon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FetchPokemonToEditData = () => {
    const pokemonToEdit = nuzlocke.pokemon.find(pokemon => pokemon._id === pokemonId);

    if (!pokemonToEdit) {
      props.GoTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
      return;
    }

    // Fetch to get info about the sprites
    if (!pokemonToEdit.originalSpecies) {
      dispatch(fetchPokemon(pokemonToEdit.species.codedName))
        .unwrap()
        .then(res => {
          // Set the sprites URLs (normal and shiny)
          const normalUrl = res.sprites.front_default;
          const shinyUrl = res.sprites.front_shiny;
          setNormalSpriteUrl(normalUrl ? normalUrl : "");
          setShinySpriteUrl(shinyUrl ? shinyUrl : "");
          SetPokemonToEditData(pokemonToEdit, shinyUrl);
        })
        .catch(() => {
          dispatch(showSnackbar("An error occured during the process"));
        })
        .finally(() => {
          setLoadingPokemonData(false);
        });
    } else {
      SetPokemonToEditData(pokemonToEdit, "");
    }
  }

  const SetPokemonToEditData = (pokemonToEdit: Pokemon, shinyUrl: string) => {
    // Set sprite
    setSprite(pokemonToEdit.sprite);

    // Set shiny
    if (!pokemonToEdit.originalSpecies && pokemonToEdit.sprite === shinyUrl) {
      setShiny(true);
    }

    // Set species
    setOriginalSpecies(pokemonToEdit.originalSpecies);
    setSpecies(pokemonToEdit.species);

    // Set first type
    const toEditTypesFirst = pokemonTypeFilters.find((type) => type.name.toLowerCase() === pokemonToEdit.types.first) || pokemonTypeFilters[0];
    setTypesFirst(toEditTypesFirst.name);

    // Set second type
    if (pokemonToEdit.types.second !== "") {
      const toEditTypesSecond = pokemonTypeFilters.find((type) => type.name.toLowerCase() === pokemonToEdit.types.second) || pokemonTypeFilters[0];
      setTypesSecond(toEditTypesSecond.name);
    }
    
    // Set ability
    setOriginalAbility(pokemonToEdit.originalAbility);

    if (pokemonToEdit.originalAbility) {
      setAbility(pokemonToEdit.ability);
    } else {
      if (pokemonToEdit.ability.codedName === "") {
        setNoAbility(true);
      } else {
        setAbility(pokemonToEdit.ability);
      }
    }

    // Set nickname
    setNickname(pokemonToEdit.nickname);

    // Set location
    setLocation(pokemonToEdit.location);

    // Set obtained
    const toEditObtained = obtainedOptions.find((option) => option.toLowerCase() === pokemonToEdit.obtained) || pokemonToEdit.obtained;
    setObtained(toEditObtained);

    // Set fainted
    setFainted(pokemonToEdit.fainted);
  }

  const DefaultPokemon = () => {
    if (!props.editMode) {
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

        // Set the sprite
        if (shiny && res.sprites.front_shiny) {
          setSprite(res.sprites.front_shiny);
        } else {
          setSprite(res.sprites.front_default);
        }

        // Set the types of the pokemon
        const firstType = pokemonTypeFilters.find((type) => type.name.toLowerCase() === res.types[0].type.name) || pokemonTypeFilters[0];
        setTypesFirst(firstType.name); 

        if (res.types[1]) {
          const secondType = pokemonTypeFilters.find((type) => type.name.toLowerCase() === res.types[1].type.name) || pokemonTypeFilters[0];
          setTypesSecond(secondType.name); 
        } else {
          setTypesSecond(""); 
        }

        // Set the ability of the pokemon
        if (res.abilities && res.abilities[0]) {
          const ability = abilitiesList.find((ability: Name) => ability.codedName === res.abilities[0].ability.name);

          if (ability) {
            setAbility(ability);
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
    setSprite(target.checked ? shinySpriteUrl : normalSpriteUrl);
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

    const error = await validateField('species', target.value);
    setSpeciesError(error);
  }

  const HandleOriginalSpeciesChange = async (e: SyntheticEvent) => {
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

    const error = await validateField('species', target.value);
    setSpeciesError(error);
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

  const HandleNoAbilityChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setNoAbility(target.checked);
  }

  const HandleNicknameChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setNickname(target.value);
  }

  const HandleLocationChange = async (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setLocation(target.value);
    const error = await validateField('location', target.value);
    setLocationError(error);
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
      nuzlockeId: nuzlockeId!,
      pokemon: {
        originalSpecies,
        species,
        nickname,
        location,
        obtained: obtained.toLowerCase(),
        sprite,
        fainted,
        types: {
          first: typesFirst.toLowerCase(),
          second: typesSecond.toLowerCase(),
        },
        originalAbility,
        ability: noAbility ? {
          codedName: "",
          formattedName: "",
        } : ability,
      }
    }

    if (props.editMode) {
      const editData = {
        ...data,
        pokemonId: pokemonId!,
      }

      dispatch(updatePokemon(editData))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
          dispatch(showSnackbar(res.msg));
          props.GoTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
        })
        .catch(error => {
          props.ValidateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(addPokemon(data))
        .unwrap()
        .then(res => {
          dispatch(setNuzlocke(res.nuzlocke));
          dispatch(showSnackbar(res.msg));
          props.GoTo(`nuzlockes/nuzlocke/${nuzlockeId}`);
        })
        .catch(error => {
          props.ValidateError(error);
        })
        .finally(() => {
          setLoading(false);
        });
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
              (!loadingPokemonData && sprite) &&
              <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                <img src={sprite} height="150px" />
              </Grid>
            }
            {
              shinySpriteUrl &&
              <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                <FormControlLabel control={<Checkbox checked={shiny} color="secondary" disabled={loading} onChange={HandleShinyChange} />} label="Shiny" sx={{ margin: "0" }} />
              </Grid>
            }
            <MultiuseText text="Species" />
            <Grid className="form-input-row" container item flexDirection={"row"} alignItems="center" justifyContent="center">
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 9 : 12}>
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
              </Grid>
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 3 : 12}>
                <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={originalSpecies} color="secondary" disabled={loading} onChange={HandleOriginalSpeciesChange} />} label={"Original species"} sx={{ margin: "0" }} />
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
                    disabled={loading}
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
                    disabled={loading}
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
              {
                !noAbility &&
                (
                  <>
                    <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 6 : 12}>
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
                    </Grid>
                    <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 3 : 6}>
                      <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                        <FormControlLabel control={<Checkbox checked={originalAbility} color="secondary" disabled={loading} onChange={HandleOriginalAbilityChange} />} label={"Original ability"} sx={{ margin: "0" }} />
                      </Grid>
                    </Grid>
                  </>
                ) 
              }
              <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 3 : 6}>
                <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={noAbility} color="secondary" disabled={loading} onChange={HandleNoAbilityChange} />} label={"No ability"} sx={{ margin: "0" }} />
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
                disabled={loading}
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
                { props.editMode ? "Update pokemon" : "Add pokemon" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
}

export default PokemonForm;