import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface Props {
  type: string;
}

function PokemonType(props: Props) {
  const pokemonFilters = useSelector((state: RootState) => state.filters.pokemonTypeFilters);

  const TypeName = () => {
    return (pokemonFilters.find(type => type.name.toLowerCase() === props.type) || pokemonFilters[0]).name;
  }

  const TypeColor = () => {
    return (pokemonFilters.find(type => type.name.toLowerCase() === props.type) || pokemonFilters[0]).color;
  }

  return (
    <div className="pokemon-type" style={{ backgroundColor: TypeColor() }}>
      <span>
        { TypeName() }
      </span>
    </div>
  );
}

export default PokemonType;
