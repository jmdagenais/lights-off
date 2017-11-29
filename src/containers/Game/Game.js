import React, { Component } from 'react';
import Grid from "../Grid/Grid";

import './Game.css';

class Game extends Component {

    render() {
        return (
          <div className="Game">
              <Grid />
          </div>
        );
    }
}

export default Game;