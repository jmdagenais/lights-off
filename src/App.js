import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { createStore } from 'redux';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faCog } from '@fortawesome/free-solid-svg-icons'


import Game from "./containers/Game/Game";
import reducer from "./store/reducer";

library.add(faCheck);
library.add(faTimes);
library.add(faCog);

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  }
}

export default App;
