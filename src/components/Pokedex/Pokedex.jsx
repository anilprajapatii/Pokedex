import PokemonList from "../PokemonList/PokemonLists";
import Search from "../Search/Search";
import "./pokedex.css";
function Pokedex(){
     return(
        <div className="pokedex-wrapper">
         <Search/>
         <PokemonList/>
        </div>
     )
}
export default Pokedex;