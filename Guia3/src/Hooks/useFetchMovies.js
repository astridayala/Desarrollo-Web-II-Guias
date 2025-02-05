import { useEffect, useState } from "react";

const API_KEY = 'eb35e3db';

export function useFetchMovies(query){
    const[movies, setMovies] = useState([]);

    useEffect(() => {
        
        async function getMovies() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const data = await res.json();
            setMovies(data.Search);
        }

        if(query.length > 2){
            getMovies();
        }
        getMovies();

    },[query])

    return {movies}
}