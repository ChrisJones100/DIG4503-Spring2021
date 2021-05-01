import React from "react";
import axios from "axios";

const API_SERVER_URL = "http://localhost:45030";

const useFavorites = (props) => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    async function fetchFavorites() {
      const response = await axios.get(`${API_SERVER_URL}/favorites`);
      setFavorites(response.data);
    }
    fetchFavorites();
  }, [props.favoriteCount]);

  return {
    favorites,
    setFavorites,
  };
};

const deleteFavorite = async (id, imdbId, favorites, setFavorites) => {
  const deleteIndex = favorites
    .map((a) => {
      return a._id;
    })
    .indexOf(id);

  await axios.delete(`${API_SERVER_URL}/favorites/${imdbId}`);

  const updatedArray = [...favorites];
  updatedArray.splice(deleteIndex, 1);
  setFavorites(updatedArray);
};

const onCheckChange = async (id, imdbId, favorites, setFavorites) => {
  const updateIndex = favorites
    .map((a) => {
      return a._id;
    })
    .indexOf(id);
  const updatedArray = [...favorites];
  updatedArray[updateIndex].completed = updatedArray[updateIndex].completed
    ? false
    : true;

  await axios.patch(
    `${API_SERVER_URL}/favorites/${imdbId}`,
    updatedArray[updateIndex]
  );
  setFavorites(updatedArray);
};

const clearFavorites = async (setFavorites) => {
  await axios.delete(`${API_SERVER_URL}/favorites`);
  setFavorites([]);
};

export const Favorites = (props) => {
  const { favorites, setFavorites } = useFavorites(props);

  return (
    <div>
      <h3>Watch List</h3>
      <p>
        <b>Check the box to mark completion of your watch list</b>
      </p>
      <div style={{ maxHeight: "400px", overflow: "auto" }}>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite._id} style={{ textAlign: "left" }}>
              <button
                style={{
                  background: "red",
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() =>
                  deleteFavorite(
                    favorite._id,
                    favorite.imdb.id,
                    favorites,
                    setFavorites
                  )
                }
              >
                Remove
              </button>
              <input
                type="checkbox"
                checked={favorite.completed ? true : false}
                onChange={(e) =>
                  onCheckChange(
                    favorite._id,
                    favorite.imdb.id,
                    favorites,
                    setFavorites
                  )
                }
              ></input>
              {favorite.title} ({favorite.year}) - {favorite.genres.join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => clearFavorites(setFavorites)}>Clear List</button>
    </div>
  );
};
