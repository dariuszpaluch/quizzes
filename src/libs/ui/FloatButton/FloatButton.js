import './float_button.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import Icon from 'libs/ui/Icon/Icon';
import Button from 'libs/ui/Button/Button';

export default class FloatButton extends Component {
  static propTypes = {
    ...Button.propTypes,
    iconSize: PropTypes.number,
    icon: PropTypes.string.isRequired,
  };

  static defaultProps = {
    iconSize: 35,
    variant: 'fab',
    color: 'primary'
  };

  render() {
    const { className, iconSize, variant, color, icon, onClick, ...props } = this.props;

    const classes = classnames(className, 'float-button');

    return (
      <Button
        {...props}
        className={classes}
        variant={variant}
        color={color}
        onClick={onClick}
      >
        <Icon icon={icon} size={iconSize}/>
      </Button>
    );
  }
}