import React from 'react';
import {connect} from 'react-redux';

import Box from '../../components/box';

import './Grid.css';
import {updateGrid} from "../../store/actions";
import {getIndexesToChange} from "../../utility";

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
    let indexesToChange = getIndexesToChange(index);

    this.props.updateGrid(index, indexesToChange);
  };

  render() {
    return (
      <div className="Grid">
        {this.props.grid.map((value, index) => {
          let color = 'black';
          if (value) {
            color = this.props.color;
          }

          return <Box
            key={index}
            color={color}
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
    winning: state.winning
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGrid: (index, indexesToUpdate) => {dispatch(updateGrid(index, indexesToUpdate))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);