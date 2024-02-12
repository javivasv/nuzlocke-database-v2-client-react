import { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Pokemon, PokemonTypes } from "../../interfaces/interfaces";
import { Grid, IconButton } from "@mui/material";
import { CatchingPokemon, CardGiftcard, Egg, SyncAlt, Block, Favorite, HeartBroken } from '@mui/icons-material';
import PokemonType from "../PokemonType";

interface Props {
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
  pokemon: Pokemon;
}

function PokemonRow(props: Props) {
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const showAsObtained = useSelector((state: RootState) => state.settings.settings[0].on);

  const [statusButtonHover, setStatusButtonHover] = useState(false);
  
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
    props.GoTo(`nuzlockes/nuzlocke/${nuzlocke._id}/pokemon/${props.pokemon._id}`);
  }

  const ChangePokemonStatus = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("CHANGE POKEMON STATUS");
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
            Boolean(Type("first")) &&
            <PokemonType type={Type("first")} />
          }
          {
            Boolean(Type("second")) &&
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
              <IconButton onClick={ChangePokemonStatus} onMouseEnter={() => setStatusButtonHover(true)} onMouseLeave={() => setStatusButtonHover(false)}>
                { StatusIcon() }
              </IconButton>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PokemonRow;
