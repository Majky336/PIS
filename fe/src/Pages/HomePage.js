import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return <Redirect push to='/books' />;
  }
}

export default HomePage;
