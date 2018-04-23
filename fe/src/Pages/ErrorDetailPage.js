import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import ErrorDetail from '../components/ErrorDetail/ErrorDetail';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';
import { getErrorDetailError, isErrorDetailCreated } from '../components/ErrorDetail/reducer';
import { createErrorDetail } from '../components/ErrorDetail/actions';

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

  componentWillMount() {
    const { history, user } = this.props;
    const { rola } = user || {};

    if (!rola) {
      history.replace('/books');
    }
  }

  componentDidMount() {
    const { location, user } = this.props;
    const { id } = user || {};
    const { state } = location;
    const { errorsList } = state || {};
    const { Errors } = errorsList || {};

    const stateErrors = Errors.map(error => {
      return {
        ...error,
        AdminId: id,
        isAccepted: false,
        isChangedByAdmin: false,
      };
    });

    this.setState({ stateErrors });
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  handleSubmit = () => {
    const { stateErrors } = this.state;
    const { createErrorDetail, history } = this.props;

    createErrorDetail(stateErrors).then(() => {
      history.goBack();
    });
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

    return Errors.map((error, index) => {
      const { NewValue, OldValue, PropertyName, UserId, CopyId } = error;

      return (
        <ErrorDetail
          adminID={id}
          copyID={CopyId}
          key={index}
          newValue={NewValue}
          handleAccept={this.handleAccept}
          oldValue={OldValue}
          propertyName={PropertyName}
          userID={UserId}
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
            <RaisedButton
              label='Potvrdiť zmeny'
              style={{ marginRight: 20}}
              overlayStyle={styles.confirmButtonStyle}
              onClick={this.handleSubmit}
            />
            <RaisedButton label='Späť' onClick={this.handleBack} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorDetail, user } = state;

  return {
    user: getUser(user),
    errorDetailError: getErrorDetailError(errorDetail),
    isErrorDetailCreated: isErrorDetailCreated(errorDetail),
  };
}

export default connect(mapStateToProps, { createErrorDetail })(ErrorDetailPage);
