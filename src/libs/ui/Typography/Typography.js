import './typography.scss';

import React from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import MaterialTypography from 'material-ui/Typography'
const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

const Typography = ({ className, variant, children, ...props }) => {

  const classes = classnames(className, 'typography', variant);

  return (
    <MaterialTypography
      className={classes}
      variant={variant}
      {...props}
    >{children}</MaterialTypography>
  )
};

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;

export default Typography;

