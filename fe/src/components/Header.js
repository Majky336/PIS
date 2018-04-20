import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Search from 'material-ui/svg-icons/action/search';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import { withRouter } from "react-router-dom";

import { colors } from '../StyleConstants/Styles';

const styles = {
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'bottom',
  },
  targetOrigin: {
    horizontal: 'left',
    vertical: 'top',
  },
}

const Logged = props => {
  const { handleBooks, handleProfile, handleLogOut, user } = props;
  const { rola } = user || 1;

  return (
    <IconMenu
      iconButtonElement={
        <IconButton>
          <MoreVertIcon
            color={colors.white}
          />
        </IconButton>
      }
      anchorOrigin={styles.anchorOrigin}
      targetOrigin={styles.targetOrigin}
    >
      <MenuItem
        leftIcon={<Search />}
        primaryText={'Knihy'}
        onClick={handleBooks}
      />
      { !rola && <MenuItem
          leftIcon={<PermIdentity />}
          primaryText="Profil"
          onClick={handleProfile}
        />
      }
      <MenuItem
        leftIcon={<PowerSettingsNew />}
        primaryText="Odhlásiť sa"
        onClick={handleLogOut}
      />
    </IconMenu>
  );
};

class Header extends Component {
  handleProfile = () => {
    const { history } = this.props;

    history.push('/profil');
  }

  handleBooks = () => {
    const { history } = this.props;

    history.push('/books');
  }

  render() {
    const { user, handleLogOut } = this.props;
    const { name } = user || '';

    return (
      <AppBar
        iconElementLeft={
          <Logged
            handleBooks={this.handleBooks}
            handleLogOut={handleLogOut}
            handleProfile={this.handleProfile}
            user={user}
          />
        }
        iconElementRight={ <FlatButton label={name} disabled />}
        title='Uber Duper Mega Knižný Výpožičkový Systém'
        style={{ backgroundColor: colors.primary }}
      />
    );
  }
}

export default withRouter(Header);
