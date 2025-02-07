/*creacion de un custom hook para obtener los detalles de una pelicula
especifica desde la API*/

import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies"; //importacion de la clave

/***
 * 
 * @param {string} selectedId
 * @returns {Objetc}
 * 
 */

export function useFetchMovieDetails(selectedId){
    //almacenar los detalles de la pelicula
    const [movie, setMovie] = useState({});

    //indicar si la solicitud esta en curso
    const [isLoading, setIsLoading] = useState(false);

    //manejar errores
    const [error, setError] = useState("");

    useEffect(() => {
        //sin ID seleccionado, limpiar el estado
        if (!selectedId){
            setMovie({});
            setError("");
            return;
        }

        /**
         * funcion asincronica que obtiene los detalles de la pelicula
         * @param {string} selectedId id unico de pelicula
         * 
         */

        async function fetchMovieDetails(selectedId) {
            try{
                setIsLoading(true); //activa el estado de carga
                setError(null); //reinicia errores previos

                //peticion a la API de OMDb con la clave de acceso y el ID de la pelicula

                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);

                //verifica si la respuesta de HTTP es correcta
                if(!response.ok)
                    throw new Error("Error al cargar los detalles de la pelicula");

                const data = await response.json();

                //guardar detalles pelicula
                setMovie(data);

            } catch(err) {
                //manejo de errores: guardar el mensaje y limpiar el estado
                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false); //finaliza el estado de carga
            }
        }

        //llama la funcion para obtener datos
        fetchMovieDetails(selectedId);
    }, [selectedId]);

    //retorna valores necesarios para su uso en componentes
    return {movie, isLoading, error};
} 