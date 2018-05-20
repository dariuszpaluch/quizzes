import './typography.scss';

import React from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import MaterialTypography from 'material-ui/Typography'
const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subheading', 'body2', 'body1', 'caption', 'button']),
  center: PropTypes.bool,
};

const defaultProps = {
  className: null,
  center: false,
};

const Typography = ({ className, variant, children, center, ...props }) => {

  const classes = classnames( 'typography', variant, { center },  className);

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

