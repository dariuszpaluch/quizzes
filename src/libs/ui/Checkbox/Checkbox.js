import './checkbox.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import MaterialCheckbox from 'material-ui/Checkbox';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary'])
  };

  static defaultProps = {
    className: '',
    checked: false,
    color: 'primary',
  };

  onClick = () => {
    const { checked } = this.props;

    this.props.onChange(!checked);
  };

  render() {
    const { className, checked, primary, ...props } = this.props;

    const classes = classnames("checkbox", className,);

    return(
      <MaterialCheckbox
        className={classes}
        checked={checked}
        onClick={this.onClick}
        color={primary}
        {...props}
      />
    );
  }
}