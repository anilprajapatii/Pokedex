import { Link } from "react-router-dom";
import "./pokemon.css"
function Pokemon({name,image,id}){
      return(
        <div className="pokemon">
            <Link to ={`/pokemon/${id}`}>
            <div>
                <img src={image}/>
            </div>
            <div className="pokemon-name">
                {name}
            </div>
            </Link>
        </div>
      )
}
export default Pokemon;