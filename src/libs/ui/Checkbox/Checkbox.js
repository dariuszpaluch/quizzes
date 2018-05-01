import './checkbox.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MaterialCheckbox from 'material-ui/Checkbox';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'default'])
  };

  static defaultProps = {
    className: '',
    checked: false,
    color: 'primary'
  };

  onChange = (event, checked) => {
    this.props.onChange(checked);
  };

  render() {
    const {
      className,
      checked,
      color,
      disabled,
      onChange,
      ...props
    } = this.props;

    const classes = classnames(
      'checkbox',
      {
        disabled
      },
      className
    );

    return (
      <MaterialCheckbox
        {...props}
        className={classes}
        checked={checked}
        onChange={this.onChange}
        color={color}
        disabled={disabled}
      />
    );
  }
}
