import Axios from "axios";

import { useState } from "react";

function Search() {
  const [searchName, setSearchName] = useState("");

  function getName() {
    Axios.get("http://localhost:45030/people/" + searchName)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log("The error is " + error);
      });
  }

  return (
    <div>
      <p>Search Name</p>
      <input
        type="text"
        onChange={event => {
          setSearchName(event.target.value);
        }}
      />
      <button onClick={() => getName()}>Search </button>
      {<p>Result: {searchName}</p>}
    </div>
  );
}

export default Search;