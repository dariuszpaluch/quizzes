import './icon.scss';

import React from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import MaterialIcon from 'material-ui/Icon';

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  bold: PropTypes.bool,
};

const defaultProps = {
  className: null,
  bold: false,
};


const Icon = ({ className, icon, size, bold }) => {

  const classes = classnames('icon', {
    'bolded': bold,
  }, className);

  return (
    <MaterialIcon
      className={classes}
      style={{fontSize: size}}
    >{icon}</MaterialIcon>
  )
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;

