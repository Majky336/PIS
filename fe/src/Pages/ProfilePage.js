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
import Divider from 'material-ui/Divider';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import Loader from '../components/Loader';
import { colors } from '../StyleConstants/Styles';
import { getUser } from '../components/User/reducer';
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
  componentDidMount() {
    const { fetchErrorHistory, user } = this.props;
    const { id } = user || 0;

    fetchErrorHistory(id);
  }

  renderErrorHistoryTableRow = () => {
    const { errorHistory } = this.props;

    if (!errorHistory || !errorHistory.length) {
      return (
        <TableRow>
          <TableRowColumn style={{ textAlign: 'center' }}>Ešte si nenahlásil žiadnu chybu.</TableRowColumn>
        </TableRow>
      );
    }

    return errorHistory.map((error, index) => {
      const { Confirmed, CopyName, CreatedAt, Resolved, PropertyName } = error || {};
      const createdAtTimestamp = parseDate(CreatedAt);

      const rowStyle = {
        backgroundColor: index % 2 === 1 ? colors.contrast : colors.white,
      }

      let status = '';
      let color = '';

      if (Confirmed) {
        color = colors.acceptedGreen;
        status = 'Vyriešená'
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

  handleBack = () => {
    const { history } = this.props;

    history.push('/books');
  }

  render() {
    const { isErrorHistoryFetching, user } = this.props;
    const { name, poslednePrihlasenie, email, body, datRegistracie } = user || {};

    const posPrihlasenieTimestamp = parseDate(poslednePrihlasenie);
    const datRegistracieTimestamp = parseDate(datRegistracie);

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
            </TableBody>
          </Table>
        </div>
        <div className='col-md-10 offset-md-1 title' style={styles.centeredText}>
          <h1>História chýb</h1>
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

export default connect(mapStateToProps, { fetchErrorHistory })(ProfilePage);
