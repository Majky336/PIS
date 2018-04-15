import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

import { getUser } from '../components/User/reducer';

class BookListPage extends Component {
  render() {
    return (
      <div>
        <div className='container-fluid'>
          <RaisedButton label='Show me profile' onClick={() => {this.props.history.push('/profil')}}/>
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

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BookListPage);
