import React from 'react';
import {connect} from 'react-redux';

import Box from '../../components/box';

import './Grid.css';
import {updateGrid} from "../../store/actions";

class Grid extends React.Component {
  state = {
    values: [0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0]
  };

  addSafeValue = (array, value) => {
    //add value >=0 and <=24
    if (value >= 0 && value <= 24) {
      array.push(value);
    }
  };

  handleBoxClick = (index) => {
    // let newValues = this.state.values.slice();
    const leftBorderIndexes = [0, 5, 10, 15, 20];
    const rightBorderIndexes = [4, 9, 14, 19, 24];
    let indexesToChange = [];
    if (leftBorderIndexes.indexOf(index) > -1) {
      //left border
      this.addSafeValue(indexesToChange, index);
      this.addSafeValue(indexesToChange, index + 1);
      this.addSafeValue(indexesToChange, index + 5);
      this.addSafeValue(indexesToChange, index - 5);
    } else if (rightBorderIndexes.indexOf(index) > -1) {
      //right border
      this.addSafeValue(indexesToChange, index);
      this.addSafeValue(indexesToChange, index - 1);
      this.addSafeValue(indexesToChange, index + 5);
      this.addSafeValue(indexesToChange, index - 5);
    } else {
      this.addSafeValue(indexesToChange, index);
      this.addSafeValue(indexesToChange, index - 1);
      this.addSafeValue(indexesToChange, index + 1);
      this.addSafeValue(indexesToChange, index - 5);
      this.addSafeValue(indexesToChange, index + 5);
    }

    this.props.updateGrid(index, indexesToChange);

    // indexesToChange.forEach((idx) => {
    //   newValues[idx] = !newValues[idx];
    // });
    //
    // this.setState({values: newValues});
  };

  render() {
    let self = this;
    return (
      <div className="Grid">
        {this.props.grid.map((value, index) => {
          let color = 'black';
          if (value) {
            color = this.props.color;
          }

          let solution = false;
          if (self.props.solution.indexOf(index) >= 0) {
            solution = true;
          }
          return <Box
            key={index}
            color={color}
            inSolution={solution}
            showSolution={this.props.showSolution}
            clicked={() => this.handleBoxClick(index)}
          />
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grid: state.currentGrid,
    color: state.color,
    solution: state.solution,
    showSolution: state.showSolution
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGrid: (index, indexesToUpdate) => {dispatch(updateGrid(index, indexesToUpdate))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);