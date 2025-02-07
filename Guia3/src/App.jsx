import { useState } from "react";
import { Logo, Nav, Search, NumResults } from "./components/Nav";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesList, WatchedMoviesContainer, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./Hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  //busqueda de las peliculas
  const [query, setQuery] = useState("");

  //obtiene peliculas basadas en la consulta
  const {movies, isLoading, error} = useFetchMovies(query); 

  //estado de peliculas vistas
  const [watched, setWatched] = useState([]);

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
                <WatchedMoviesList watched={watched}/>
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
