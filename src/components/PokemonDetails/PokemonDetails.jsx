import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemonDetails.css";
function PokemonDetails()
{
     const {id} = useParams()
     const [pokemon,setPokemon] = useState({});
     async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=>t.type.name)
        })
     }

     useEffect(()=>{
        downloadPokemon();
     },[])

     return(
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image}/>
            <div className="details">
            <div className="pokemon-name" >Name : <span>{pokemon.name}</span></div>
            <div className="pokemon-name" > Height : <span>{pokemon.height}</span></div>
            <div className="pokemon-name"> Weigth : <span>{pokemon.weight}</span></div>
            <div className="pokemon-name">
                Type : {pokemon.types?.map((t) => <span key={t}> {t} </span>)}
            </div>
            </div>
        </div>
     )
}
export default PokemonDetails;