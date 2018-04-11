import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom'

import AppRoot from './AppRoot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MuiThemeProvider>
            <AppRoot />
          </MuiThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
