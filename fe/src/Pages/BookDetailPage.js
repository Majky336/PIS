import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import { createBookErrors } from '../components/BookErrors/actions';
import { getUser } from '../components/User/reducer';
import { isBookErrorsCreated, getBookErrorsError } from '../components/BookErrors/reducer';
import { colors } from '../StyleConstants/Styles';
import { parseDate } from '../lib/Parsers';
import './BookDetailPage.css';

const styles = {
  editButtonStyle: {
    backgroundColor: colors.contrast,
  },
  centeredText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyle: {
    borderColor: colors.contrast,
  },
  underlineFocusStyle: {

  },
};

class BookDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Author: '',
      BindingType: '',
      BookName: '',
      CopyName: '',
      Description: '',
      Genre: '',
      ISBN: '',
      Language: '',
      NumberOfPages: 0,
      Publishers: '',
      ReleaseFormat: '',
      YearOfPublication: '',
      isEdit: false,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    const { state } = location;
    const { detail } = state || {};
    const {
      Author,
      BindingType,
      BookName,
      CopyName,
      Description,
      Genre,
      ISBN,
      Language,
      NumberOfPages,
      Publishers,
      ReleaseFormat,
      YearOfPublication,
    } = detail;

    const YOPT = format(parseDate(YearOfPublication), 'DD-MM-YYYY');

    this.setState({
      Author,
      BindingType,
      BookName,
      CopyName,
      Description,
      Genre,
      ISBN,
      Language,
      NumberOfPages,
      Publishers,
      ReleaseFormat,
      YearOfPublication: YOPT,
    });
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  }

  handleEdit = () => {
    const { isEdit } = this.state;
    const { createBookErrors, user, location } = this.props;
    const { state } = location;
    const { detail } = state;

    if (isEdit) {
      const errors = Object.keys(this.state).map(property => {
        if (property === 'YearOfPublication') {
          const oldValue = format(parseDate(detail[property]), 'DD-MM-YYYY');
          return {
            UserID: user.id,
            CopyID: detail.CopyId,
            OldValue: oldValue,
            NewValue: this.state[property],
            PropertyName: property,
          };
        } else if( property === 'isEdit' ) {
          return null;
        } else {
          return {
            UserID: user.id,
            CopyID: detail.CopyId,
            OldValue: detail[property],
            NewValue: this.state[property],
            PropertyName: property,
          };
        }
      });

      createBookErrors(errors);
    }

    this.setState({ isEdit: !isEdit });
  }

  handeNumberOfPagesChange = event => {
    const { target } = event;
    const { value } = target;

    if (/^[0-9]*$/i.test(value)) {
      this.setState({ NumberOfPages: value });
    }
  }

  handleChange = event => {
    let { errorsArray } = this.state;
    const { target } = event;
    const { id, value } = target;

    this.setState({
      [id]: value,
    });
  }

  render() {
    const {
      Author,
      BindingType,
      BookName,
      CopyName,
      Description,
      Genre,
      ISBN,
      isEdit,
      Language,
      NumberOfPages,
      Publishers,
      ReleaseFormat,
      YearOfPublication,
    } = this.state;

    const getEditButtonLabel = isEdit ? 'Odoslať zmeny' : 'Navrhnúť zmeny';

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-10 offset-sm-1 chose'>
            <h1>{CopyName}</h1>
          </div>
        </div>
        { isEdit &&
          <div className='row' style={styles.centeredText}>
            <div className='col-sm-3 offset-sm-2'>
              <h4>Názov</h4>
            </div>
            <div className='col-sm-5'>
              <TextField
                id={'CopyName'}
                disabled={!isEdit}
                value={CopyName}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineStyle}
                onChange={this.handleChange}
              />
            </div>
          </div>
        }
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Autor</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Author'}
              disabled={!isEdit}
              value={Author}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Žáner</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Genre'}
              disabled={!isEdit}
              value={Genre}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>ISBN</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'ISBN'}
              disabled={!isEdit}
              value={ISBN}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Rok vydania</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'YearOfPublication'}
              disabled={!isEdit}
              value={YearOfPublication}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Popis</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Description'}
              disabled={!isEdit}
              value={Description}
              multiLine
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Vydavateľstvo</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Publishers'}
              disabled={!isEdit}
              value={Publishers}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Jazyk</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Language'}
              disabled={!isEdit}
              value={Language}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Typ väzby</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'BindingType'}
              disabled={!isEdit}
              value={BindingType}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Formát</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'ReleaseFormat'}
              disabled={!isEdit}
              value={ReleaseFormat}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-3 offset-sm-2'>
            <h4>Počet strán</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'NumberOfPages'}
              disabled={!isEdit}
              value={NumberOfPages}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handeNumberOfPagesChange}
            />
          </div>
        </div>
        <div className='col-sm-10 offset-sm-1' style={{ marginTop: 20}}>
          <RaisedButton label='Späť' onClick={this.handleBack} />
          <RaisedButton
            label={getEditButtonLabel}
            onClick={this.handleEdit}
            overlayStyle={styles.editButtonStyle}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { bookErrors, user } = state;

  return {
    user: getUser(user),
    isCreated: isBookErrorsCreated(bookErrors),
    error: getBookErrorsError(bookErrors),
  };
}

const mapDispatchToProps = {
  createBookErrors,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
