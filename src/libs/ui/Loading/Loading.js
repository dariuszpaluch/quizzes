import './loading.scss';

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { CircularProgress } from 'material-ui/Progress';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
  center: PropTypes.bool
};

const defaultProps = {
  className: null,
  size: 50,
  center: false
};

const Loading = ({ className, size, center }) => {
  const classes = classnames('loading', { center }, className);

  return <CircularProgress className={classes} size={size} />;
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
