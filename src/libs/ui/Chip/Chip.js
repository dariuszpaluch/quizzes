import './chip.scss';

import React from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';
import MaterialChip from 'material-ui/Chip';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeleteArg: PropTypes.any,
};

const defaultProps = {
  className: null,
};

const Chip = ({
                className,
                label,
                avatar,
                onDelete,
              }) => {

  const classes = classnames(className, 'chip');

  return (
    <MaterialChip
      className={classes}
      avatar={avatar}
      label={label}
      onDelete={onDelete}
    />
  )
};

Chip.propTypes = propTypes;
Chip.defaultProps = defaultProps;

export default Chip;

