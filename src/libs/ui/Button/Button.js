import React, { Component } from 'react';
import PropTypes from 'prop-types'

import MaterialButton from 'material-ui/Button';

export default class Button extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['flat', 'raised', 'fab']),
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  };

  static defaultProps = {
    variant: 'raised',
    color: 'primary',
  };

  render() {
    const {
      children,
      variant,
      color,
      onClick,
      ...props,
    } = this.props;

    return (
      <MaterialButton
        variant={variant}
        color={color}
        onClick={onClick}
        {...props}
      >{children}</MaterialButton>
    );
  }
}