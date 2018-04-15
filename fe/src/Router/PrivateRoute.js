import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  authorizationGuard = props => {
    const { component: Component, user } = this.props;

    if (user) {
      return <Component {...props} />;
    }
    return (
      <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    );
  }

  render() {
      const { component: Component, user, ...rest } = this.props;

      return <Route {...rest} render={props => this.authorizationGuard(props)} />;
  }
}

export default PrivateRoute;
