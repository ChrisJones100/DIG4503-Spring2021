import React from "react";
import axios from "axios";

const API_SERVER_URL = "http://localhost:45030";

const useMovie = (props) => {
  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    async function fetchMovie() {
      if (props.movie) {
        const response = await axios.get(
          `${API_SERVER_URL}/movies/${props.movie}`
        );
        setMovie(response.data);
      }
    }
    fetchMovie();
  }, [props]);

  return {
    movie,
    setMovie,
  };
};

const renderView = (movie) => {
  if (movie) {
    return (
      <div>
        <h3>Movie Details</h3>
        <p>
          <b>Title: </b>
          {movie.title}
        </p>
        <p>
          <b>Year: </b>
          {movie.year}
        </p>
        <p>
          <b>Plot: </b>
          {movie.fullplot}
        </p>
        <p>
          <b>Genre(s): </b>
          {movie.genres?.join(", ")}
        </p>
        <p>
          <b>Director(s): </b>
          {movie.directors?.join(", ")}
        </p>
        <p>
          <b>Rated: </b>
          {movie.rated}
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export const MovieDetail = (props) => {
  const { movie } = useMovie(props);

  return renderView(movie);
};
