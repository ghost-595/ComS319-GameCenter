import React, { Component } from "react";
 
class Games extends Component {
  render() {
    return (
      <div>
        <h2>Games</h2>
        <p>You can play all of the following
            games at GameHub:</p>
        <ol>
          <li>Tetris</li>
          <li>Checkers</li>
          <li>Chess</li>
        </ol>
      </div>
    );
  }
}
 
export default Games;