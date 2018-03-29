import React, { Component } from 'react';
import PropTypes from 'prop-types'

import MaterialButton from 'material-ui/Button';
import noop from 'lodash/noop';

export default class Button extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['flat', 'raised', 'fab']),
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    variant: 'raised',
    color: 'default',
    disabled: false,
  };

  render() {
    const {
      children,
      variant,
      onClick,
      disabled,
      ...props,
    } = this.props;


    return (
      <MaterialButton
        variant={variant}
        onClick={!disabled ? onClick : noop}
        disabled={disabled}
        {...props}
      >{children}</MaterialButton>
    );
  }
}