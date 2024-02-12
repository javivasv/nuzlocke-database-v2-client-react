import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Divider, Button } from "@mui/material";
import DeleteDialog from "../DeleteDialog";
import CustomCardContent from "../CustomCardContent";

function PokemonForm() {
  const { pokemonId } = useParams();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const HandleShowDeleteDialog = () => {
    setShowDeleteDialog(!showDeleteDialog);
  }

  const HandleDelete = () => {
    HandleDeletePokemon();
  }

  const HandleDeletePokemon = () => {
    setLoading(true);

    /*
    dispatch(deleteNuzlocke(nuzlocke._id!))
      .unwrap()
      .then(res => {
        dispatch(showSnackbar(res.msg));
        dispatch(fetchNuzlockes())
          .unwrap()
          .then(res => {
            dispatch(setNuzlockes(res.nuzlockes));
            props.GoTo("nuzlockes");
          });
      })
      .catch(error => {
        props.ValidateError(error);
      })
      .finally(() => {
        setLoading(false);
      });
      */
  }

  return (
    <>
      {
        Boolean(pokemonId) &&
        <>
          <Grid className="action-row" container item flexDirection={"row"} alignItems="center" justifyContent='center'>
            <Button color='error' variant="outlined" onClick={HandleShowDeleteDialog}>
            Delete pokemon
            </Button>
          </Grid>
          <Divider sx={{ margin: "12px 0" }} />
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
      <Divider sx={{ margin: "12px 0" }} />
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
      <DeleteDialog HandleShowDeleteDialog={HandleShowDeleteDialog} HandleDelete={HandleDelete} show={showDeleteDialog} name={"nuzlocke.name"} loading={loading} />
    </>
  );
}

export default PokemonForm;