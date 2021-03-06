import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Grid from "../Grid/Grid";
import Settings from '../Settings/Settings';
import {nextLevel, previousLevel, restartLevel, showSettings, toggleSolution, undo} from "../../store/actions";

import './Game.css';

class Game extends Component {

    render() {
      let winningOverlay = (
        <div className="game-overlay">
          <span>Congratulations!</span>
          <a href="javascript:;" onClick={this.props.nextLevel}>Next level</a>
        </div>
      );

      let settingsOverlay = (
        <div className="dark-overlay">
          <Settings></Settings>
        </div>
      );

      if (!this.props.winning) {
        winningOverlay = null;
      }

      if (!this.props.settingsVisible) {
        settingsOverlay = null;
      }

      let toggleBtnLabel = '';
      if (this.props.solutionVisible) {
        toggleBtnLabel = 'Hide Solution';
      } else {
        toggleBtnLabel = 'Show Solution';
      }

      return (
        <div className="Game">
          {settingsOverlay}
          <a onClick={this.props.openSettings}><FontAwesomeIcon icon="cog" className="cog"></FontAwesomeIcon></a>
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
              <button className="btn btn-sm" onClick={this.props.toggleSolution}>{toggleBtnLabel}</button>
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
    currentLevel: state.level,
    solutionVisible: state.showSolution,
    settingsVisible: state.showSettings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    undoLastMove: () => { dispatch(undo()) },
    restartLevel: () => { dispatch(restartLevel()) },
    nextLevel: () => { dispatch(nextLevel()) },
    previousLevel: () => { dispatch(previousLevel()) },
    toggleSolution: () => { dispatch(toggleSolution()) },
    openSettings: () => { dispatch(showSettings()) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);