import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import format from 'date-fns/format';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';
import { updateUserPoints } from '../components/User/actions';
import { getErrorHistory, isErrorHistoryFetching } from '../components/ErrorHistory/reducer';
import { fetchErrorHistory } from '../components/ErrorHistory/actions';
import { parseDate } from '../lib/Parsers';
import './ProfilePage.css';


const styles = {
  rowTitle: {
    fontWeight: 'bold',
  },
  centeredText: {
    textAlign: 'center',
  },
  errorTable: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: colors.contrast,
  }
};

const properties = {
  Author: 'Autor',
  BindingType: 'Typ ',
  CopyName: 'Názov výtlačku',
  Description: 'Popis',
  Genre: 'Žáner',
  Isbn: 'ISBN',
  Language: 'Jazyk',
  NumberOfPages: 'Počet strán',
  Publishers: 'Vydavateľstvo',
  ReleaseFormat: 'Formát vydania',
  YearOfPublication: 'Rok vydania',
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
      isDialogOpen: false,
      sortIndex: null,
      radioButtonValue: 0,
    };
  }

  componentDidMount() {
    const { fetchErrorHistory, user } = this.props;
    const { id } = user || 0;

    fetchErrorHistory(id);
  }

  renderErrorHistoryTableRow = () => {
    const { errorHistory } = this.props;
    const { sortIndex } = this.state;

    if (!errorHistory || !errorHistory.length) {
      return (
        <TableRow>
          <TableRowColumn style={{ textAlign: 'center' }}>Ešte si nenahlásil žiadnu chybu.</TableRowColumn>
        </TableRow>
      );
    }

    const filteredList = errorHistory.filter(error => {
      switch (sortIndex) {
        case 1:
          return error.Confirmed;
        case 2:
          return (!error.Resolved)
        case 3:
          return (error.Resolved && !error.Confirmed);
        default:
          return true;
      }
    })

    return filteredList.map((error, index) => {
      const { Confirmed, CopyName, CreatedAt, Resolved, PropertyName } = error || {};
      const createdAtTimestamp = parseDate(CreatedAt);

      const rowStyle = {
        backgroundColor: index % 2 === 1 ? colors.contrast : colors.white,
      }

      let status = '';
      let color = '';

      if (Confirmed) {
        color = colors.acceptedGreen;
        status = 'Potvrdená'
      } else if (Resolved && !Confirmed) {
        color = colors.deniedRed;
        status = 'Zamietnutá'
      } else {
        color = colors.pendingYellow;
        status = 'Čaká na vyhodnotenie';
      }

      return (
        <TableRow key={index} style={rowStyle}>
          <TableRowColumn>{CopyName}</TableRowColumn>
          <TableRowColumn>{properties[PropertyName]}</TableRowColumn>
          <TableRowColumn>{format(createdAtTimestamp, 'DD-MM-YYYY')}</TableRowColumn>
          <TableRowColumn style={{ color }}>{status}</TableRowColumn>
        </TableRow>
      );
    });
  }

  handleOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => {
    this.setState({ isDialogOpen: false, errorText: '' });
  };

  handleSubmit = () => {
    const { radioButtonValue } = this.state;
    const { user, updateUserPoints } = this.props;
    const { body, id } = user || {};

    const mapper = {
      '75': 6,
      '50': 3,
      '20': 1,
    };

    const updatedPoints = body - radioButtonValue;

    if (radioButtonValue) {
      if (updatedPoints >= 0) {
        return updateUserPoints(radioButtonValue, id, mapper[radioButtonValue]).then(() =>{
          this.setState({ errorText: 'Členké bolo úspešne predĺžené' })  
        });
      }
      return this.setState({ errorText: 'Pre vybraté predĺženie nemáš dostatok bodov.' })
    }
  }

  handleSort = (event, index, value) => this.setState({ sortIndex: value });

  handleBack = () => {
    const { history } = this.props;

    history.push('/books');
  }

  handleRadioButtonChange = (event, value) => {
    this.setState({ radioButtonValue: value });
  }

  render() {
    const { isErrorHistoryFetching, user } = this.props;
    const { errorText, isDialogOpen, sortIndex } = this.state;
    const { name, poslednePrihlasenie, email, body, datRegistracie, platneClenske } = user || {};

    const posPrihlasenieTimestamp = parseDate(poslednePrihlasenie);
    const datRegistracieTimestamp = parseDate(datRegistracie);
    const platneClenskeTimestamp = parseDate(platneClenske);

    const actions = [
      <FlatButton
        label="Zrušiť"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Potvrdiť"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    if (isErrorHistoryFetching) {
      return (
        <div className='container-fluid wrapper'>
          <Loader />
        </div>
      );
    }

    return (
      <div className='container-fluid'>
        <div className='col-md-6 offset-md-3 title' style={styles.centeredText}>
          <h1>Informácie o profile</h1>
          <Table selectable={false} style={{ marginBottom: 20 }}>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Meno</TableRowColumn>
                <TableRowColumn>{name}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Email</TableRowColumn>
                <TableRowColumn>{email}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Dátum registrácie</TableRowColumn>
                <TableRowColumn>{format(datRegistracieTimestamp, 'DD-MM-YYYY')}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Body</TableRowColumn>
                <TableRowColumn>{body}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Posledné prihlásenie</TableRowColumn>
                <TableRowColumn>{format(posPrihlasenieTimestamp, 'DD-MM-YYYY HH:mm')}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Členké platné do</TableRowColumn>
                <TableRowColumn>{format(platneClenskeTimestamp, 'DD-MM-YYYY HH:mm')}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <Dialog
            title='Predĺžiť členské pomocou bodov'
            modal={false}
            actions={actions}
            open={isDialogOpen}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            Aktuálny počet bodov: {body}
            <RadioButtonGroup onChange={this.handleRadioButtonChange} name='pointValue'>
              <RadioButton
                value='20'
                label='O mesiac (20 bodov)'
                style={{ marginTop: 16 }}
              />
              <RadioButton
                value='50'
                label='O 3 mesiace (50 bodov)'
                style={{ marginTop: 16 }}
              />
              <RadioButton
                value='75'
                label='O 6 mesiacov (75 bodov)'
                style={{ marginTop: 16, marginBottom: 16 }}
              />
            </RadioButtonGroup>
            {errorText}
          </Dialog>
          <RaisedButton
            fullWidth
            overlayStyle={styles.overlayButton}
            label='Využiť body'
            onClick={this.handleOpen}
          />
        </div>
        <div className='col-md-10 offset-md-1 title'>
          <h1 style={styles.centeredText}>História chýb</h1>
          <div style={styles.errorTable}>
            <span style={{ marginRight: 20 }}>Filtrovať chyby</span>
            <SelectField
              onChange={this.handleSort}
              value={sortIndex}
              selectedMenuItemStyle={{ color: colors.primary}}
            >
              <MenuItem value={null} primaryText='' />
              <MenuItem value={1} primaryText='Potvrdené' />
              <MenuItem value={2} primaryText='Čaká na vyhodnotenie' />
              <MenuItem value={3} primaryText='Zamietnuté' />
            </SelectField>
          </div>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={styles.rowTitle}>Kniha</TableHeaderColumn>
                <TableHeaderColumn style={styles.rowTitle}>Údaj o knihe</TableHeaderColumn>
                <TableHeaderColumn style={styles.rowTitle}>Dátum nahlásenia</TableHeaderColumn>
                <TableHeaderColumn style={styles.rowTitle}>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={true}
            >
              {this.renderErrorHistoryTableRow()}
            </TableBody>
          </Table>
          <Divider style={{marginBottom: 20}}/>
          <RaisedButton label='Späť' fullWidth onClick={this.handleBack}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { errorHistory, user } = state;

  return {
    errorHistory: getErrorHistory(errorHistory),
    isErrorHistoryFetching: isErrorHistoryFetching(errorHistory),
    user: getUser(user),
  };
}

export default connect(mapStateToProps, { fetchErrorHistory, updateUserPoints })(ProfilePage);
