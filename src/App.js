import React, {useEffect, useState} from 'react';
import PokemonTile from './assets/component/pokemon-tile/PokemonTile';
import axios from "axios";
import './App.css';


function App() {

    const [resultData, setResultData] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            try {
                const result = await axios.get(`${url}`,{cancelToken: source.token});
                setPokemons(result.data.results);
                setResultData(result);
                setUrl(result.request.responseURL)
            } catch (error) {
                if (axios.isCancel(error)) {
                } else {
                    throw error;
                }
            }
        }

        if (url) {
            fetchData();
        }

        return function cleanup() {
            source.cancel();
        }

    }, [url])

    function next() {
        setUrl(resultData.data.next)
    }

    function previous() {
        setUrl(resultData.data.previous)
    }

    return (

        <>
            <nav>
                {resultData &&
                <button disabled={!resultData.data.previous} type="button" onClick={previous}>vorige</button>
                }
                {resultData &&
                <button disabled={!resultData.data.next} type="button" onClick={next}>volgende</button>
                }
            </nav>
            <div className="container">
                {pokemons && pokemons.map((pokemon) => {
                    return <PokemonTile
                        name={pokemon.name}
                        key={pokemon.name}
                    />
                })}
            </div>
            <footer>
                {resultData &&
                <button disabled={!resultData.data.previous} type="button" onClick={previous}>vorige</button>
                }
                {resultData &&
                <button disabled={!resultData.data.next} type="button" onClick={next}>volgende</button>
                }
            </footer>
        </>
    );
}

export default App;
