import { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updatePokemon } from "../../store/pokemon/pokemonSlice";
import { setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { Pokemon, PokemonTypes, CustomError } from "../../interfaces/interfaces";
import { Grid, IconButton } from "@mui/material";
import { CatchingPokemon, CardGiftcard, Egg, SyncAlt, Block, Favorite, HeartBroken } from '@mui/icons-material';
import PokemonType from "../PokemonType";
import useGoTo from '../../customHooks/useGoTo';

interface Props {
  ValidateError: (e: CustomError) => void;
  isMdAndUp: boolean;
  pokemon: Pokemon;
}

function PokemonRow(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const showAsObtained = useSelector((state: RootState) => state.settings.settings[0].on);
  const [statusButtonHover, setStatusButtonHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const goTo = useGoTo();
  
  const PokemonRowClassName = () => {
    let className = "table-row";

    if (props.pokemon.fainted) {
      className = className + " fainted-pokemon-row";
    }

    return className;
  }

  const ShowSpriteRow = () => {
    if (showAsObtained) {
      return (props.pokemon.obtainedAs!).sprite !== '';
    }

    return props.pokemon.sprite !== '';
  }

  const Type = (type: string) => {
    if (showAsObtained) {
      return (props.pokemon.obtainedAs!).types[type as keyof PokemonTypes];
    }

    return props.pokemon.types[type as keyof PokemonTypes];
  }

  const Ability = () => {
    if (showAsObtained) {
      return (props.pokemon.obtainedAs!).ability.formattedName !== "" ? (props.pokemon.obtainedAs!).ability.formattedName : "-";
    }

    return props.pokemon.ability.formattedName !== "" ? props.pokemon.ability.formattedName : "-";
  }

  const ObtainedIcon = () => {
    switch(props.pokemon.obtained) {
    case "caught":
      return <CatchingPokemon />;
    case "gifted":
      return <CardGiftcard />;
    case "hatched":
      return <Egg />;
    case "traded":
      return <SyncAlt />;
    case "not":
      return <Block />;
    default:
      return <CatchingPokemon />;
    }
  }

  const StatusIcon = () => {
    if (props.pokemon.fainted) {
      if (statusButtonHover) {
        return <Favorite />;
      }

      return <HeartBroken />;
    } else {
      if (statusButtonHover) {
        return <HeartBroken />;
      }

      return <Favorite />;
    }
  }

  const CheckPokemon = () => {
    if (loading) {
      return;
    }

    goTo(`nuzlockes/nuzlocke/${nuzlocke._id}/pokemon/${props.pokemon._id}`);
  }

  const ChangePokemonStatus = (e: MouseEvent<HTMLButtonElement>, pokemon: Pokemon) => {
    e.stopPropagation();

    if (loading) {
      return;
    }

    setLoading(true);

    const data = {
      nuzlockeId: nuzlocke._id!,
      pokemonId: pokemon._id!,
      pokemon: {
        ...pokemon,
        fainted: !pokemon.fainted,
      }
    }

    dispatch(updatePokemon(data))
      .unwrap()
      .then(res => {
        dispatch(setNuzlocke(res.nuzlocke));
        dispatch(showSnackbar(res.msg));
      })
      .catch(error => {
        props.ValidateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Grid className={PokemonRowClassName()} container flexDirection={"row"} onClick={CheckPokemon}>
      <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 2 : 3}>
        {
          ShowSpriteRow() &&
          <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
            <img src={showAsObtained ? (props.pokemon.obtainedAs!).sprite : props.pokemon.sprite} />
          </Grid>
        }
        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span className="table-text">
            { showAsObtained ? (props.pokemon.obtainedAs!).species.formattedName : props.pokemon.species.formattedName }
          </span>
        </Grid>
        <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
          {
            Type("first") &&
            <PokemonType type={Type("first")} />
          }
          {
            Type("second") &&
            <PokemonType type={Type("second")} />
          }
        </Grid>
      </Grid>
      <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 2 : 3}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span className="table-text">
            { props.pokemon.nickname !== "" ? props.pokemon.nickname : "-" }
          </span>
        </Grid>
      </Grid>
      {
        props.isMdAndUp &&
        <Grid container item flexDirection={"column"} xs={2}>
          <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
            <span className="table-text">
              { Ability() }
            </span>
          </Grid>
        </Grid>
      }
      <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 2 : 3}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          <span className="table-text">
            { props.pokemon.location }
          </span>
        </Grid>
      </Grid>
      {
        props.isMdAndUp &&
        <Grid container item flexDirection={"column"} xs={2}>
          <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
            <span className="table-text">
              { ObtainedIcon() }
            </span>
          </Grid>
        </Grid>
      }
      <Grid container item flexDirection={"column"} xs={props.isMdAndUp ? 2 : 3}>
        <Grid className="h-100" container item flexDirection={"row"} alignItems="center" justifyContent="center">
          {
            props.pokemon.obtained === "not" &&
            <span className="table-text">
              -
            </span>
          }
          {
            props.pokemon.obtained !== "not" &&
            <IconButton disabled={loading} onClick={(e) => ChangePokemonStatus(e, props.pokemon)} onMouseEnter={() => setStatusButtonHover(true)} onMouseLeave={() => setStatusButtonHover(false)}>
              { StatusIcon() }
            </IconButton>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PokemonRow;
