import React from "react";
import "./App.css";
import { AllMovies } from "./components/AllMovies";
import { Favorites } from "./components/Favorites";

const useFavoriteCount = () => {
  const [favoriteCount, setFavoriteCount] = React.useState(0);

  return {
    favoriteCount,
    setFavoriteCount,
  };
};

const App = () => {
  const { favoriteCount, setFavoriteCount } = useFavoriteCount();

  return (
    <div className="App">
      <header className="App-header">Chris' Sophisticated Movie App</header>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "65%" }}>
          <AllMovies
            favoriteCount={favoriteCount}
            setFavoriteCount={setFavoriteCount}
          ></AllMovies>
        </div>
        <div style={{ width: "35%" }}>
          <Favorites favoriteCount={favoriteCount}></Favorites>
        </div>
      </div>
    </div>
  );
};

export default App;
