import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import BookListPage from './Pages/BookListPage';
import Header from './components/Header';
import LoginPage from './Pages/LoginPage';
import NotFoundPage from './Pages/NotFoundPage';
import ProfilePage from './Pages/ProfilePage';

import { getUser } from './components/User/reducer';
import { resetUser } from './components/User/actions';

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
              handleProfile={this.handleProfile}
              resetUser={resetUser}
              user={user}
            />
          }
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/user" component={BookListPage} />
            <Route exact path="/profil" component={ProfilePage} />
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
