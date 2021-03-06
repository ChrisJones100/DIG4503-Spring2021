import React from "react";
import axios from "axios";
import Pokemon from "./Pokemon";
import ResetButton from "./ResetButton";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class PokemonTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamMembers: [],
    };
  }

  render() {
    const { teamMembers } = this.state;

    const onClick = async () => {
      const randomInt = getRandomInt(0, 255);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomInt}`
      );

      // console.log(response.data);
      // console.log(response.data.name);
      // console.log(response.data.sprites.front_default);

      const newTeamMember = (
        <Pokemon
          name={response.data.name}
          imageUri={response.data.sprites.front_default}
        />
      );
      this.setState({
        teamMembers: [...teamMembers, newTeamMember]
      });
    };

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <div className='controls'>
          
          <button onClick={onClick}>Make Team!</button>
          <ResetButton onClick={() => this.setState({ teamMembers: [] })} />
        </div>
        <div className='team-members-container'>
          {teamMembers}
        </div>
      </div>
    );
  }
}
