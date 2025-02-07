import React from 'react'

/** 
 * Componente que muestra una lista de peliculas
 * @param {Object[]} movies - Lista de peliculas a renderizar
 * @param {Function} onSelectMovie - Funcion que se ejecuta al selecciona una pelicula
 */

export const MovieList = ({movies, onSelectMovie}) => {
    return(
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie 
                    movie={movie} 
                    key={movie.imdbID}
                    onSelectMovie = {onSelectMovie}
                />
            ))}
        </ul>
    );
};

/**
 * 
 * @param {Object} movie - Datos de la pelicula
 * @param {Function} onSelectMovie - funcion que se ejecuta al hacer click en la pelicula
 */

export const Movie = ({movie, onSelectMovie}) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`}/>
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
        </div>
    </li>
  );
};
