import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { colors } from '../StyleConstants/Styles';
import { fetchUser } from '../components/User/actions';
import { isUserError, isUserFetching, getUser } from '../components/User/reducer';
import './LoginPage.css';

const styles = {
  underlineStyle: {
    borderColor: colors.contrast,
  },
  floatingLabelStyle: {
    color: colors.black
  },
  overlayStyle: {
    backgroundColor: colors.contrast,
  }
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: '',
      isForgottenPassword: false,
      isOpen: false,
      password: '',
      passwordError: '',
    };
  }

  handleEmailChange = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ email: value }, this.validateEmail);
  }

  handlePasswordChange = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ password: value }, this.validatePassword);
  }

  handleRequestClose = () => {
    this.setState({ isOpen: false });
  }

  validateEmail = () => {
    const { email } = this.state;

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ emailError: 'Nesprávny formát' });
    } else {
      this.setState({ emailError: '' });
    }
  }

  validatePassword = () => {
    const { password } = this.state;

    if (!password) {
      this.setState({ passwordError: 'Toto pole je povinné' });
    } else {
      this.setState({ passwordError: '' });
    }
  }

  handleLogin = () => {
    const { email, password, isForgottenPassword } = this.state;
    const { fetchUser } = this.props;

    if (!email) {
      return this.setState({ emailError: 'Toto pole je povinné' });
    }

    if (!password) {
      return this.setState({ passwordError: 'Toto pole je povinné' });
    }

    if (!isForgottenPassword) {
      fetchUser({
        email,
        heslo: password,
      })
    }

    if (isForgottenPassword) {
      this.setState({ isOpen: true });
    }
  }

  handleForgottenPassword = () => {
    const { isForgottenPassword } = this.state;

    this.setState({
      isForgottenPassword: !isForgottenPassword,
      emailError: '',
      passwordError: '',
    });
  }

  getButtonLabels = () => {
    const { isForgottenPassword } = this.state;

    if (isForgottenPassword) {
      return {
        loginButtonLabel: 'Odoslať nové heslo',
        forgottenPasswordLabel: 'Spať na prihlásenie',
      };
    }

    return {
      loginButtonLabel: 'Prihlásenie',
      forgottenPasswordLabel: 'Zabudnuté heslo?',
    };
  }

  render() {
    const { email, emailError, isForgottenPassword, isOpen, passwordError } = this.state;
    const { user, location } = this.props;
    const { from } = location.state || { from: { pathname: '/user' }};
    const { loginButtonLabel, forgottenPasswordLabel } = this.getButtonLabels();

    if (user) {
      return <Redirect to={from} />;
    }

    return (
      <div className="wrapper">
        <div className="border">
          <div className="header">
            <h1>Prihlásenie</h1>
          </div>
          <div className="form-wrapper">
          <TextField
            id="email"
            errorText={emailError}
            onChange={this.handleEmailChange}
            hintText="meno@email.com"
            floatingLabelText="Email"
            value={email}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
            floatingLabelStyle={styles.floatingLabelStyle}
          />
          {
            !isForgottenPassword && <TextField
              id="heslo"
              errorText={passwordError}
              onChange={this.handlePasswordChange}
              floatingLabelText="Heslo"
              type="password"
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              floatingLabelStyle={styles.floatingLabelStyle}
            />
          }
            <RaisedButton
              onClick={this.handleLogin}
              label={loginButtonLabel}
              overlayStyle={styles.overlayStyle}
              fullWidth
              style={{ marginTop: 40 }}
            />
          {
            <FlatButton
              onClick={this.handleForgottenPassword}
              label={forgottenPasswordLabel}
              fullWidth
              style={{ marginTop: 10 }}
            />
          }
          </div>
        </div>
        <Snackbar
          open={isOpen}
          message="Nové heslo bolo odoslané na zadaný e-mail"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;

  return {
    user: getUser(user),
    isUserError: isUserError(user),
    isUserFetching: isUserFetching(user),
  };
}

export default connect(mapStateToProps, { fetchUser })(LoginPage);
