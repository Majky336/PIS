import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    {/* <Route path="*" component={NotFoundPage} /> */}
  </Switch>
);

export default Routes;
