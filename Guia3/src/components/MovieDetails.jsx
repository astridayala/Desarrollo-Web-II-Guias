import { useEffect, useState } from "react";
import { useFetchMovies } from "../Hooks/useFetchMovies";
import StarRating from "./StarRating";
import { useFetchMovieDetails } from "../Hooks/useFetchMovieDetails";

/**
 * 
 * componentes que muestran los detalles de una pelicula y permite al usuario
 * calificarla y agregarla a su lista de vistas
 * 
 * @param {Object} props
 * @param {string} props.selectedId - ID pelicula seleccionada
 * @param {Function} props.onCloseMovie - cerrar los detalles de la pelicula
 * @param {Function} props.onAddWatched - agregar la pelicula a la lista de vistas
 * @param {Array} props.watched - lista peliculas ya vistas
 * 
 */

export const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
    
    //hook personalizado para obtener los detalles de la pelicula
    const { movie, error, isLoading } = useFetchMovieDetails(selectedId);

    //extraemos la informacion relevante de la pelicula
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    //estado para la calificacion del usuario
    const [userRating, setUserRating] = useState('');

    //verifica si la pelicula ya esta en la lista de vistas
    const isWatched = watched.some(movie => movie.imdbID === selectedId);

    //obtiene la calificacion previa del usuaio si ya la ha visto
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    /**
     * Maneja la adicion de una pelicula a la lista de vistas
     */
    function handleAdd(){
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]), //extrae solo el numero de mins
            userRating
        };

        onAddWatched(newMovie);
        onCloseMovie(); //cierra detalles despues de agregar
    }

    return (
        <div className="details">
            {isLoading ? (
                <p className="loader">Cargando...</p>
            ) : (
                <>
                    
                </>
            )

            }
        </div>
    )

}