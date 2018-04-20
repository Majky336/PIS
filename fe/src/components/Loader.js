import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';

import { colors } from '../StyleConstants/Styles';

const Loader = ({ mode }) => {
  if (mode === 'login') {
    return <LinearProgress color={colors.primary} mode="indeterminate" />
  }
  return <CircularProgress color={colors.primary} size={80} />;
}

export default Loader;
