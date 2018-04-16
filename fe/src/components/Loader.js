import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import { colors } from '../StyleConstants/Styles';

const Loader = () => <CircularProgress color={colors.primary} size={80} />;

export default Loader;
