import { useState, useEffect } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./Hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

export default function App() {

  function MoviesWatched(){
    const localMovies = localStorage.getItem('watched')
    return localMovies ? JSON.parse(localMovies):[]
  }

  //busqueda de las peliculas
  const [query, setQuery] = useState("");

  //obtiene peliculas basadas en la consulta
  const {movies, isLoading, error} = useFetchMovies(query); 

  //estado de peliculas vistas
  const [watched, setWatched] = useState(MoviesWatched);

  useEffect(()=>{
      localStorage.setItem('watched',JSON.stringify(watched))
    },[watched])

  //estado para la pelicula seleccionada
  const [selectedId, setSelectedId] = useState(null);

  /**
   * maneja la seleccion de una pelicula
   * @param {string} id - id pelicula seleccionada
   */

  function handleSelectMovie(id){
    setSelectedId(id);
  }

  function handleCloseMovie(){
    setSelectedId(null);
  }

  /**
   * agregar una pelicula a la lista de vistas
   * @param {Object} movie - pelicula a agregar
   */

  function handleAddWatched(movie){
    setWatched((watched) => [...watched, movie]);
  }

  function removeMovie(movie){
    setWatched(watched.filter(item => item.imdbID !== movie.imdbID));
  }

  return (
    <>
      <Nav>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Nav>

      <main className="main">

        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
         <MovieList movies={movies} onSelectMovie={handleSelectMovie}/> 
        </Box>
        
        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched}/>
                <WatchedMoviesList 
                  watched={watched}
                  deleteMovie = {removeMovie}
                />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
};
