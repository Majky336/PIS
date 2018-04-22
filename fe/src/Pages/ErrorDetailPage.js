import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import ErrorDetail from '../components/ErrorDetail/ErrorDetail';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';

const styles = {
  confirmButtonStyle: {
    backgroundColor: colors.contrast,
  },
}

class ErrorDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateErrors: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    const { errorsList } = state || {};
    const { Errors } = errorsList || {};

    this.setState({ stateErrors: Errors });
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  handleAccept = details => {
    const { PropertyName: detailPropertyName } = details;
    const { stateErrors } = this.state;

    const newStateErrors = stateErrors.filter(error => {
      const { PropertyName } = error;

      if (PropertyName === detailPropertyName) {
        return false;
      }
      return true;
    });

    this.setState({ stateErrors: [ ...newStateErrors, details ]});

  }

  renderError = () => {
    const { location, user } = this.props;
    const { id } = user;
    const { state } = location;
    const { errorsList } = state || {};
    const { Errors } = errorsList || {};

    return Errors.map(error => {
      const { NewValue, OldValue, PropertyName, UserID } = error;

      return (
        <ErrorDetail
          adminID={id}
          key={PropertyName}
          newValue={NewValue}
          handleAccept={this.handleAccept}
          oldValue={OldValue}
          propertyName={PropertyName}
          userID={UserID}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <div className='row' style={{alignItems: 'center', justifyContent: 'center', marginTop: 20, fontFamily: 'Roboto'}}>
          <div className='col-sm-2'>
            <h4>{' '}</h4>
          </div>
          <div className='col-sm-3'>
            <h4>Pôvodná hodnota</h4>
          </div>
          <div className='col-sm-3'>
            <h4>Navrhnovaná zmena</h4>
          </div>
          <div className='col-sm-2'>
            <h4>Pripočítať body</h4>
          </div>
        </div>
        {this.renderError()}
        <div className='row' style={{ marginTop: 20 }}>
          <div className='col-sm-6 offset-sm-1'>
            <RaisedButton label='Potvrdiť zmeny' style={{ marginRight: 20}} overlayStyle={styles.confirmButtonStyle}/>
            <RaisedButton label='Späť' onClick={this.handleBack} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;

  return {
    user: getUser(user),
  };
}

export default connect(mapStateToProps)(ErrorDetailPage);