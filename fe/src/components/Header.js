import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'

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
  const { handleProfile, handleLogOut } = props;

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
        leftIcon={<PermIdentity />}
        primaryText="Profil"
        onClick={handleProfile}
      />
      <Divider />
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

  }

  render() {
    const { user, handleLogOut, handleProfile } = this.props;
    const { name } = user || '';

    return (
      <AppBar
        iconElementLeft={<Logged handleProfile={this.handleProfile} handleLogOut={handleLogOut} />}
        iconElementRight={ <FlatButton label={name} disabled />}
        title='Uber Duper Mega Knižný Výpožičkový Systém'
        style={{ backgroundColor: colors.primary }}
      />
    );
  }
}

export default Header;
