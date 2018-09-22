import './loading.scss';

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  return (
    <div className={classes}>
      <CircularProgress size={size} />
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
