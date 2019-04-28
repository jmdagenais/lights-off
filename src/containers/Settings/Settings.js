import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Settings.css';

class Settings extends Component {

    colors = ['yellow', '#00FF00', '#00FFFF', 'red', 'pink'];

    render() {
        return (
        <div class="Settings">
          <h2>Settings</h2>
          <span>Choose a light color</span>
          <div className="colorPicker">
          {
            this.colors.map(color => {
              return (
                <div key={color} className="cell-color" style={{backgroundColor: color}}></div>
              )
            })
          }
          </div>

          <div>
            <button>Save</button>
          </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    color: state.color
  };
}

function matchDispatchToProps(dispatch) {
  return {
    saveSettings: null
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(Settings);