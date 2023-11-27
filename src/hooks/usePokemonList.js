import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
   
      setPokemonListState((state) => ({ ...state, isLoading: true }));
      const response = await axios.get(pokemonListState.pokedexUrl); //this downloads the list of 20 Pokemons
      const pokemonResults = response.data.results; // We get the array of pokemons from list

      console.log("resp is", response.data.pokemon);
      console.log(pokemonListState);
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
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
        isLoading: false,
      }));
    
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
