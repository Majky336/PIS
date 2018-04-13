import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { api } from '../api/api';
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    };
  }

  handleEmailChange = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ email: value });
  }

  handlePasswordChange = event => {
    const { target } = event;
    const { value } = target;

    this.setState({ password: value });
  }

  handleLogin = () => {
    const { email, password } = this.state;

    this.setState({ emailError: '', passwordError: '' });

    if (!email) {
      this.setState({ emailError: 'Toto pole je povinné' })
    }

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({ emailError: 'Nesprávny formát' })
    }

    if (!password) {
      this.setState({ passwordError: 'Toto pole je povinné' })
    }

    api.post('/api/login/', {
  	 email: 'konomrd',
      heslo: 'konomrd'
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const { email, emailError, passwordError } = this.state;
    return (
      <div className="wrapper">
        <div>
          <TextField
            id="email"
            errorText={emailError}
            onChange={this.handleEmailChange}
            hintText="meno@email.com"
            floatingLabelText="Email"
            value={email}
          />
        <div>
          <TextField
            id="heslo"
            errorText={passwordError}
            onChange={this.handlePasswordChange}
            floatingLabelText="Heslo"
            type="password"
          />
        </div>
        </div>
        <RaisedButton
          onClick={this.handleLogin}
          label="Prihlás"
        />
      </div>
    );
  }
}

export default LoginPage;
