import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { getUser } from '../components/User/reducer';
import './ProfilePage.css';


const styles = {
  rowTitle: {
    fontWeight: 'bold',
  },
};

class ProfilePage extends Component {
  handleBack = () => {
    const { history } = this.props;

    history.push('/books');
  }

  render() {
    const { user } = this.props;
    const { name, poslednePrihlasenie, email, body, datRegistracie } = user || {};

    return (
      <div className='container-fluid'>
        <div className='col-md-6 offset-md-3 title'>
          <h1>Informácie o profile</h1>
          <Table selectable={false}>
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
                <TableRowColumn>{format(datRegistracie, 'DD MM YYYY')}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Body</TableRowColumn>
                <TableRowColumn>{body}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.rowTitle}>Posledné prihlásenie</TableRowColumn>
                <TableRowColumn>{poslednePrihlasenie}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
          <Divider style={{marginBottom: 20}}/>
          <RaisedButton label='Späť' onClick={this.handleBack}/>
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

export default connect(mapStateToProps)(ProfilePage);
