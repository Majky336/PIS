import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

import { colors } from '../../StyleConstants/Styles';

const properties = {
  Author: 'Autor',
  BindingType: 'Typ ',
  CopyName: 'Názov výtlačku',
  Description: 'Popis',
  Genre: 'Žáner',
  ISBN: 'ISBN',
  Language: 'Jazyk',
  NumberOfPages: 'Počet strán',
  Publishers: 'Vydavateľstvo',
  ReleaseFormat: 'Formát vydania',
  YearOfPublication: 'Rok vydania',
}

const styles = {
  underlineStyle: {
    borderColor: colors.contrast,
  },
}

class ErrorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      currentValue: '',
    };
  }

  componentDidMount() {
    const { newValue } = this.props;

    this.setState({ currentValue: newValue });
  }

  handleChange = event => {
    const { propertyName } = this.props;
    const { target } = event;
    const { value } = target;

    if (propertyName === 'NumberOfPages' ) {
      /^[0-9]*$/i.test(value) && this.setState({ currentValue: value });
    } else {
      this.setState({ currentValue: value });
    }
  }

  handleCheck = (event, isChecked) => {
    const { handleAccept, userID, oldValue, propertyName, adminID } = this.props;
    const { currentValue } = this.state;

    handleAccept({
      AdminID: adminID,
      isAccepted: isChecked,
      NewValue: currentValue,
      OldValue: oldValue,
      PropertyName: propertyName,
      UserID: userID,
    });
  }

  render() {
    const { oldValue, propertyName } = this.props;
    const { currentValue } = this.state;

    return (
      <div className='row' style={{alignItems: 'center', justifyContent: 'center' }}>
        <div className='col-sm-2'>
          <h4>{properties[propertyName]}</h4>
        </div>
        <div className='col-sm-3'>
          <TextField
            id={'bla'}
            disabled
            value={oldValue}
          />
        </div>
        <div className='col-sm-3'>
          <TextField
            id={'bla2'}
            value={currentValue}
            onChange={this.handleChange}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineStyle}
          />
        </div>
        <div className='col-sm-2' style={{ alignItems: 'center', justifyContent: 'center'}}>
          <Checkbox onCheck={this.handleCheck}/>
        </div>
      </div>
    );
  }
}

export default ErrorDetail;
