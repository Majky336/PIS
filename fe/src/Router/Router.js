import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import BookListPage from '../Pages/BookListPage';
import Header from '../components/Header';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import NotFoundPage from '../Pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../Pages/ProfilePage';

import { getUser } from '../components/User/reducer';
import { resetUser } from '../components/User/actions';

class Router extends Component {
  handleLogOut = () => {
    const { resetUser } = this.props;

    resetUser();
  }

  render() {
    const { user } = this.props;

    return (
      <BrowserRouter>
        <div>
          {
            user && <Header
              handleLogOut={this.handleLogOut}
              resetUser={resetUser}
              user={user}
            />
          }
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path='/' component={HomePage}  user={user}/>
            <PrivateRoute exact path='/books' component={BookListPage} user={user} />
            <PrivateRoute exact path='/profil' component={ProfilePage}  user={user}/>
            <Route path="*" component={NotFoundPage} />}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;

  return {
    user: getUser(user),
  };
}

const mapDispatchToProps = {
  resetUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
