import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { deletePokemon } from "../../store/pokemon/pokemonSlice";
import { fetchNuzlocke, setNuzlocke } from "../../store/nuzlockes/nuzlockesSlice";
import { showSnackbar } from "../../store/notifications/notificationsSlice";
import { CustomError } from "../../interfaces/interfaces";
import { Grid, Divider, Button } from "@mui/material";
import DeleteDialog from "../DeleteDialog";
import CustomCardContent from "../CustomCardContent";
import useGoTo from '../../customHooks/useGoTo';

interface Props {
  ValidateError: (e: CustomError) => void;
}

function PokemonForm(props: Props) {
  const { pokemonId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const nuzlocke = useSelector((state: RootState) => state.nuzlockes.nuzlocke)!;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const goTo = useGoTo();
  const editMode = pokemonId ? true : false;

  const PokemonName = () =>{
    const pokemon = nuzlocke.pokemon.find(pokemon => pokemon._id === pokemonId);

    if (pokemon) {
      return pokemon.nickname ? pokemon.nickname : pokemon.species.formattedName;
    }

    return "";
  }

  const HandleShowDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  }

  const HandleDelete = () => {
    HandleDeletePokemon();
  }

  const HandleDeletePokemon = () => {
    setLoading(true);

    const data = {
      nuzlockeId: nuzlocke._id!,
      pokemonId: pokemonId!,
    }

    dispatch(deletePokemon(data))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
        dispatch(fetchNuzlocke(nuzlocke._id!))
          .unwrap()
          .then(res => {
            dispatch(setNuzlocke(res.nuzlocke));
            goTo(`nuzlockes/nuzlocke/${nuzlocke._id}`);
          });
      })
      .catch(error => {
        props.ValidateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      {
        editMode &&
        <>
          <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
            <Button color='error' variant="outlined" onClick={HandleShowDeleteDialog}>
              Delete pokemon
            </Button>
          </Grid>
          <Divider className="horizontal-divider" />
        </>        
      }
      <CustomCardContent>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Species:&nbsp;</strong>
            The species of the pokemon
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Original species:&nbsp;</strong>
            In case of being an original pokemon species or being a species not
            existing in any previous game or region
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Type(s):&nbsp;</strong>
            The type(s) of the pokemon
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Ability:&nbsp;</strong>
            The ability of the pokemon, if it has one
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Original ability:&nbsp;</strong>
            In case of being an original pokemon ability or being an ability not
            existing in any previous game or region
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Nickname:&nbsp;</strong>
            The nickname given to the pokemon, if given one
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Location:&nbsp;</strong>
            The location in which the pokemon was obtained or encountered
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Obtained:&nbsp;</strong>
            The way in which the pokemon was obtained, or if it was obtained
          </span>
        </Grid>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            <strong>Shiny:&nbsp;</strong>
            The species sprite is shown with the shiny coloration, if there is
            one
          </span>
        </Grid>
      </CustomCardContent>
      <Divider className="horizontal-divider" />
      <CustomCardContent>
        <Grid className="card-text-row" container flexDirection={"row"} justifyContent="center">
          <span className="card-text">
            Not all the pokemon listed have a sprite and not all the pokemon
            that have one, have a sprite with the shiny coloration. The pokemon
            data and abilities come from the&nbsp;
            <a
              className="website-link"
              href="https://pokeapi.co/docs/v2"
              target="_blank"
            >
              PokeAPI V2
            </a>
          </span>
        </Grid>
      </CustomCardContent>
      {
        (nuzlocke && pokemonId) &&
        <DeleteDialog HandleShowDeleteDialog={HandleShowDeleteDialog} HandleDelete={HandleDelete} show={showDeleteDialog} name={PokemonName()} loading={loading} />
      }
    </>
  );
}

export default PokemonForm;