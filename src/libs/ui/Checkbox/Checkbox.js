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
  };

  static defaultProps = {
    className: '',
    checked: false,
  };

  onClick = () => {
    const { checked } = this.props;

    this.props.onChange(!checked);
  };

  render() {
    const { className, checked } = this.props;

    const classes = classnames("checkbox", className,);

    return(
      <MaterialCheckbox
        className={classes}
        checked={checked}
        onClick={this.onClick}
      />
    );
  }
}