import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import AppRoot from './AppRoot';
import store from './Redux/configureStore';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <MuiThemeProvider>
            <Provider store={store}>
              <AppRoot />
            </Provider>
          </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
