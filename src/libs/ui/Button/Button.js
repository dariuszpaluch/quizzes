import './button.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import MaterialButton from 'material-ui/Button';
import noop from 'lodash/noop';
import Icon from 'libs/ui/Icon/Icon';

export default class Button extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['flat', 'raised', 'fab']),
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    reverse: PropTypes.bool,
  };

  static defaultProps = {
    variant: 'raised',
    color: 'default',
    disabled: false,
    icon: '',
    reverse: false,
  };

  render() {
    const {
      children,
      variant,
      onClick,
      disabled,
      icon,
      className,
      reverse,
      ...props,
    } = this.props;

    const classes = classnames('button', {
      reverse,
    },className);

    return (
      <MaterialButton
        className={classes}
        variant={variant}
        onClick={!disabled ? onClick : noop}
        disabled={disabled}
        {...props}
      >
        {icon ?
          <Icon
            className="icon-button"
            icon={icon}
          />
          : null
        }
        {children}
      </MaterialButton>
    );
  }
}