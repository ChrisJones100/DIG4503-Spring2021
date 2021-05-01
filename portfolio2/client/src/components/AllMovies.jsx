import React from "react";
import axios from "axios";
import { MovieDetail } from "./MovieDetail";

const API_SERVER_URL = "http://localhost:45030";

const useMovies = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(`${API_SERVER_URL}/movies`);
      setMovies(response.data);
    }
    fetchMovies();
  }, []);

  return {
    movies,
    setMovies,
  };
};

const useMovie = () => {
  const [movie, setMovie] = React.useState(null);

  return {
    movie,
    setMovie,
  };
};

const addMovieToFavorites = async (movie, props) => {
  await axios.put(`${API_SERVER_URL}/favorites`, movie);
  props.setFavoriteCount(props.favoriteCount + 1);
};

export const AllMovies = (props) => {
  const { movies } = useMovies();
  const { movie, setMovie } = useMovie();

  return (
    <div>
      <h3>All Movies</h3>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <ul>
          {movies.map((movie) => (
            <li key={movie._id} style={{ textAlign: "left" }}>
              <button
                style={{
                  background: "green",
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() => setMovie(movie.imdb.id)}
              >
                View
              </button>
              <button
                style={{
                  background: "yellow",
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() => addMovieToFavorites(movie, props)}
              >
                Watch
              </button>
              {movie.title} ({movie.year}) - {movie.genres.join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <MovieDetail movie={movie}></MovieDetail>
      </div>
    </div>
  );
};
