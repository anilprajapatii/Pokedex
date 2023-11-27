import { useParams } from "react-router-dom";
import "./pokemonDetails.css";
import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id);
  return (
    <>
      <div className="pokemon-details-wrapper">
        <img className="pokemon-details-image" src={pokemon.image} />
        <div className="details">
          <div className="pokemon-name">
            Name : <span>{pokemon.name}</span>
          </div>
          <div className="pokemon-name">
            Height : <span>{pokemon.height}</span>
          </div>
          <div className="pokemon-name">
            Weigth : <span>{pokemon.weight}</span>
          </div>
          <div className="pokemon-name">
            Type :
            {pokemon.types?.map((t) => (
              <span key={t}> {t} </span>
            ))}
          </div>
        </div>
      </div>

      {
       pokemon.types &&  pokemon.similarPokemons && 
       <div>
        more {pokemon.types[0]} type Pokemons
        <ul>
           {pokemon.similarPokemons.map((p)=> <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
        </ul>
       </div>
      }
    </>
  );
}
export default PokemonDetails;
