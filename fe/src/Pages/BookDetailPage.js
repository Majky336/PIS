import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ReactTooltip from 'react-tooltip'
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Warning from 'material-ui/svg-icons/alert/warning';
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
      Isbn: '',
      Language: '',
      NumberOfPages: 0,
      Publishers: '',
      ReleaseFormat: '',
      YearOfPublication: '',
      isEdit: false,
      isOpen: false,
    };
  }

  componentWillMount() {
    const { history, user } = this.props;
    const { rola } = user || {};

    if (rola) {
      history.replace('/errors');
    }
  }

  componentDidMount() {
    const { location } = this.props;
    const { state } = location;
    const { detail } = state || {};

    const {
      Author,
      BindingType,
      BookName,
      CopyName,
      Description,
      Genre,
      Isbn,
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
      Isbn,
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
        } else if( property === 'isEdit' || property === 'isOpen' ) {
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

      createBookErrors(errors).then(() => {
        this.setState({ isOpen: true });
      });
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

  handleRequestClose = () => {
    this.setState({ isOpen: false });
  }

  handleChange = event => {
    const { target } = event;
    const { id, value } = target;

    this.setState({
      [id]: value,
    });
  }

  render() {
    const { location } = this.props;
    const { state } = location;
    const { detail } = state || {};

    const {
      Author,
      BindingType,
      CopyName,
      Description,
      Genre,
      Isbn,
      isEdit,
      isOpen,
      Language,
      NumberOfPages,
      Publishers,
      ReleaseFormat,
      YearOfPublication,
    } = this.state;

    const {
      IsAuthorAvaliable,
      IsBindingTypeAvaliable,
      IsDescriptionAvaliable,
      IsGenreAvaliable,
      IsIsbnAvaliable,
      IsLanguageAvaliable,
      IsNumberOfPagesAvaliable,
      IsPublishersAvaliable,
      IsReleaseFormatAvaliable,
      IsYearOfPublicationAvaliable,
    } = detail;

    const getEditButtonLabel = isEdit ? 'Odoslať zmeny' : 'Navrhnúť zmeny';

    return (
      <div className='container-fluid' style={{fontFamily: 'Roboto'}}>
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
          <div className='col-sm-1 offset-sm-1'>
            {!IsAuthorAvaliable && <Warning data-tip data-for='warning' color='#FCC432'/>}
          </div>
          <div className='col-sm-3'>
            <h4>Autor</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Author'}
              disabled={!(isEdit && IsAuthorAvaliable)}
              value={Author}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsGenreAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Žáner</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Genre'}
              disabled={!(isEdit && IsGenreAvaliable)}
              value={Genre}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsIsbnAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>ISBN</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Isbn'}
              disabled={!(isEdit && IsIsbnAvaliable)}
              value={Isbn}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsYearOfPublicationAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Rok vydania</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'YearOfPublication'}
              disabled={!(isEdit && IsYearOfPublicationAvaliable)}
              value={YearOfPublication}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsDescriptionAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Popis</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Description'}
              disabled={!(isEdit && IsDescriptionAvaliable)}
              value={Description}
              multiLine
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsPublishersAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Vydavateľstvo</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Publishers'}
              disabled={!(isEdit && IsPublishersAvaliable)}
              value={Publishers}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsLanguageAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Jazyk</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'Language'}
              disabled={!(isEdit && IsLanguageAvaliable)}
              value={Language}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsBindingTypeAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Typ väzby</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'BindingType'}
              disabled={!(isEdit && IsBindingTypeAvaliable)}
              value={BindingType}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsReleaseFormatAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Formát</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'ReleaseFormat'}
              disabled={!(isEdit && IsReleaseFormatAvaliable)}
              value={ReleaseFormat}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='row' style={styles.centeredText}>
          <div className='col-sm-1 offset-sm-1'>
            {!IsNumberOfPagesAvaliable && <Warning data-tip data-for='warning' color='#FCC432' />}
          </div>
          <div className='col-sm-3'>
            <h4>Počet strán</h4>
          </div>
          <div className='col-sm-5'>
            <TextField
              id={'NumberOfPages'}
              disabled={!(isEdit && IsNumberOfPagesAvaliable)}
              value={NumberOfPages}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineStyle}
              onChange={this.handeNumberOfPagesChange}
            />
          </div>
        </div>
        <ReactTooltip id='warning'>
          <span>Tento údaj je už nahlásený</span>
        </ReactTooltip>
        <div className='row'>
          <div className='col-sm-4 offset-sm-3' style={{ marginTop: 20, display: 'flex' }}>
            <RaisedButton
              style={{ marginRight: 20  }}
              label={getEditButtonLabel}
              onClick={this.handleEdit}
              overlayStyle={styles.editButtonStyle}
            />
            <RaisedButton label='Späť' onClick={this.handleBack} />
          </div>
        </div>
        <Snackbar
          open={isOpen}
          message="Návrh na zmenu údajov bol úspešne zaznamenaný"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
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
