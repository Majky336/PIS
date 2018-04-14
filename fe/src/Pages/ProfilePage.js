import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import { getUser } from '../components/User/reducer';

const styles = {
  rowTitle: {
    fontWeight: 'bold',
  },
};

class ProfilePage extends Component {
  render() {
    const { user } = this.props;
    const { name, poslednePrihlasenie, email, body, datRegistracie } = user || {};
    console.log(typeof(datRegistracie));
    return (
      <div className='container-fluid'>
        <div className='col-sm-4' style={{ width: '30%'}}>
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
