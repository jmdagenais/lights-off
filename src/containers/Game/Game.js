import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from "../Grid/Grid";
import {restartLevel, showSolution, undo} from "../../store/actions";

import './Game.css';

class Game extends Component {

    render() {
        return (
          <div className="Game">
            <h1>Lights off</h1>
            <h5>Turn all the cells to black</h5>
            <Grid />
            <div className="buttons">
              <button className="btn btn-sm" onClick={this.props.showSolution}>Show answer</button>
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
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    undoLastMove: () => { dispatch(undo()) },
    restartLevel: () => { dispatch(restartLevel()) },
    showSolution: () => { dispatch(showSolution()) }
  }
};

export default connect(null, mapDispatchToProps)(Game);