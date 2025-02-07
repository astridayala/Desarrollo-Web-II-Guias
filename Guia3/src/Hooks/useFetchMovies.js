import { useEffect, useState } from "react";

export const API_KEY = 'eb35e3db';

/**
 * 
 * @param {string} query 
 * @returns {Object} retorna un objeto con una lista de peliculas, 
 *                   estado de carga de solicitud
 *                   mensaje de error en caso de fallo  
 */

export function useFetchMovies(query){
    const[movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if(query.length < 3){
            setMovies([]);
            setError("");
            return;
        }

        //funcion asincronica
        async function fetchMovies() {
            try{
                setIsLoading(true);
                setError(null);

                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);

                if (!response.ok)
                    throw new Error("Error al cargar películas");

                const data = await response.json();

                if(data.Response === "False")
                    throw new Error("No se encontraron resultados");

                setMovies(data.Search);

            } catch(err){
                //manejo de errores: guarda el mensaje de error y limpia la lista de peliculas

                setError(err.message);
                setMovies([]);

            } finally {
                setIsLoading(false); //finaliza el estado de carga
            }
            
        }

        fetchMovies();
        
        /*async function getMovies() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const data = await res.json();
            setMovies(data.Search);
        }

        if(query.length > 2){
            getMovies();
        }
        getMovies();*/

    },[query]) //se ejecuta cada vez que cambia la consulta

    //retorna los valores necesarios para su uso en componentes
    return {movies, isLoading, error}; 
}