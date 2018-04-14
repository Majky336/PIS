import React, { Component } from 'react';

import './NotFoundPage.css';

class NotFoundPage extends Component {
  render() {
    return (
      <div className='container-fluid wrapper'>
        <div className='alert'>
          <h1>404</h1>
          Tu nič nie je, choď preč.
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
