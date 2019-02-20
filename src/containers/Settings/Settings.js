import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

import './Settings.css';
import {hideSettings, saveSettings} from "../../store/actions";

class Settings extends Component {

  colors = ['yellow', '#59e256', '#2bc0ff', 'red', 'pink', '#fdc400'];
  selectedColor;

  constructor(props) {
    super(props);
    // this.selectedColor = props.color;
    this.state = {selectedColor: props.color};
  }

  saveSettings = () => {
    const settings = {
      color: this.state.selectedColor,
      mode: 'classic'
    };

    this.props.saveSettings(settings);
  };

  render() {
    return (
      <div className="Settings">
        <h2>Settings</h2>
        <span>Choose a light color</span>
        <div className="colorPicker">
          {
            this.colors.map(color => {
              let selected = this.state.selectedColor === color ? ' selected-color' : '';
              return (
                <div className={'cell-color' + selected} key={color} style={{backgroundColor: color}} onClick={() => {this.setState({selectedColor:color})}}></div>
              )
            })
          }
        </div>

        <div className="settings-buttons">
          <a onClick={this.saveSettings} className="btn-ok"><FontAwesomeIcon icon="check" size="3x" ></FontAwesomeIcon></a>
          <a onClick={this.props.cancel} className="btn-cancel"><FontAwesomeIcon icon="times" size="3x"></FontAwesomeIcon></a>
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
    saveSettings: (settings) => { dispatch(saveSettings(settings.color, settings.mode)); },
    cancel: () => { dispatch(hideSettings()) }
  };
}


export default connect(mapStateToProps, matchDispatchToProps)(Settings);