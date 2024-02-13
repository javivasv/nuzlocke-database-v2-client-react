import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchPokemonList, fetchAbilitiesList, setPokemonList, setAbilitiesList } from "../store/pokeapi/pokeapiSlice";
import { showSnackbar } from '../store/notifications/notificationsSlice';
import { CustomError } from "../interfaces/interfaces";
import PokemonForm from '../components/Nuzlocke/PokemonForm';
import LoadingRow from '../components/LoadingRow';

interface Props {
  ValidateError: (e: CustomError) => void;
  GoTo: (e: string) => void;
  isMdAndUp: boolean;
}

function PokemonFormContainer(props: Props) {
  const { pokemonId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const abilitiesList = useSelector((state: RootState) => state.pokeapi.abilities);
  const pokemonList = useSelector((state: RootState) => state.pokeapi.pokemon);

  const editMode = pokemonId ? true : false;

  const [loadingPokemonAbilities, setLoadingPokemonAbilities] = useState(true);
  const [loadingPokemonList, setLoadingPokemonList] = useState(true);

  useEffect(() => {
    if (abilitiesList.length === 0) {
      FetchPokemonAbilities();
    } else {
      setLoadingPokemonAbilities(false);
    }

    if (pokemonList.length === 0) {
      FetchPokemon();
    } else {
      setLoadingPokemonList(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FetchPokemonAbilities = () => {
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

  const FetchPokemon = () => {
    setLoadingPokemonList(true);

    dispatch(fetchPokemonList())
      .unwrap()
      .then(res => {
        dispatch(setPokemonList(res.list));
      })
      .catch(() => {
        dispatch(showSnackbar("An error occured during the process"));
      })
      .finally(() => {
        setLoadingPokemonList(false);
      });
  }

  return (
    <>
      {
        (loadingPokemonAbilities || loadingPokemonList) &&
        <LoadingRow />
      }
      {
        (!loadingPokemonAbilities && !loadingPokemonList) &&
        <PokemonForm ValidateError={props.ValidateError} GoTo={props.GoTo} isMdAndUp={props.isMdAndUp} editMode={editMode} />    
      }
    </>
    
  );
}
  
export default PokemonFormContainer;