import React, {useEffect, useState} from "react";
import {Puff} from "react-loader-spinner";
import "./PokemonTile.css";
import axios from "axios";

function PokemonTile({name}) {

    const [pokemonInfo, setPokemonInfo] = useState();
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`, {cancelToken: source.token});
                setPokemonInfo(result.data);
                if (result.data.sprites.other.[`official-artwork`].front_default) {
                    setIsLoading(false);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error;
                }
            }
        }

        fetchData();

        return function cleanup() {
            source.cancel();
        }

    }, [name])


    return (

        <div>
            {isLoading ? <Puff height="100" width="100" color="lightgray" ariaLabel="Loading"/> :
                <div className="pokemon-tile">
                    <h1>{pokemonInfo.name}</h1>
                    {pokemonInfo.sprites.other.[`official-artwork`].front_default ?
                        <img src={pokemonInfo.sprites.other.[`official-artwork`].front_default} alt="pokemon"/> :
                        <img src={pokemonInfo.sprites.other.home.front_default} alt="pokemon"/>
                    }
                    <h2>Moves: {pokemonInfo.moves.length}</h2>
                    <h2>Weight: {pokemonInfo.weight}</h2>
                    <ul>
                        <h2>Abilities:</h2>
                        <li>{pokemonInfo.abilities[0].ability.name}</li>
                        {pokemonInfo.abilities[1] &&
                        <li>{pokemonInfo.abilities[1].ability.name}</li>
                        }
                        {pokemonInfo.abilities[2] &&
                        <li>{pokemonInfo.abilities[2].ability.name}</li>
                        }
                    </ul>
                </div>
            }
        </div>
    );
}

export default PokemonTile;