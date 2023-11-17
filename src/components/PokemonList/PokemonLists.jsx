import { useEffect, useState } from "react";
import "./pokemonList.css";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    
    setPokemonListState((state) => ({ ...pokemonListState, isLoading:true}));
    const response = await axios.get(pokemonListState.pokedexUrl); //this downloads the list of 20 Pokemons
    const pokemonResults = response.data.results; // We get the array of pokemons from list
    

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    // iterating over the array of pokemons,and using their url,to create an array of promises
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // Passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); // Array of 20 pokemon detailed data
    

    // Now iterate on the data of each pokemon, and extract id,name image, types
    const pokeListResult = pokemonData.map((pokedata) => {
      const pokemon = pokedata.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
   
    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false
    }));
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading.."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.prevUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
