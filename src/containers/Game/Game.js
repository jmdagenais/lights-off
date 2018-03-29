import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from "../Grid/Grid";
import {nextLevel, restartLevel, undo} from "../../store/actions";

import './Game.css';

class Game extends Component {

    render() {
        let winningOverlay = (
          <div className="game-overlay">
            <span>Congratulations!</span>
            <a onClick={this.props.nextLevel}>Next level</a>
          </div>
        );

        if (!this.props.winning) {
          winningOverlay = null;
        }

        return (
          <div className="Game">
            <h1>Lights off</h1>
            <h5>Turn all the cells to black</h5>
            <div className="game-zone">
              {winningOverlay}
              <Grid />
              <div className="buttons">
                <div>
                  <button
                    className="btn btn-sm"
                    onClick={this.props.restartLevel}
                    style={{marginRight: '3px'}}>
                      <i className="fa fa-refresh"/>
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={this.props.undoLastMove}>
                      <i className="fa fa-undo"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    winning: state.winning,
    currentLevel: state.level
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    undoLastMove: () => { dispatch(undo()) },
    restartLevel: () => { dispatch(restartLevel()) },
    nextLevel: () => { dispatch(nextLevel()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);