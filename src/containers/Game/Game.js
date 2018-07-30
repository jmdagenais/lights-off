import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from "../Grid/Grid";
import {nextLevel, previousLevel, restartLevel, undo} from "../../store/actions";

import './Game.css';

class Game extends Component {

    render() {
      let winningOverlay = (
        <div className="game-overlay">
          <span>Congratulations!</span>
          <a href="javascript:;" onClick={this.props.nextLevel}>Next level</a>
        </div>
      );

      if (!this.props.winning) {
        winningOverlay = null;
      }

      return (
        <div className="Game">
          <h1>Lights off</h1>
          <div className="second-line">
            <h5>Turn all the cells to black</h5>
            <div className="level-change">
              <a href="javascript:;" onClick={this.props.previousLevel}><i className="fa fa-caret-left"></i></a>
              &nbsp;
              {this.props.currentLevel}
              &nbsp;
              <a href="javascript:;" onClick={this.props.nextLevel}><i className="fa fa-caret-right"></i></a>
            </div>
          </div>
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
    nextLevel: () => { dispatch(nextLevel()) },
    previousLevel: () => { dispatch(previousLevel()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);