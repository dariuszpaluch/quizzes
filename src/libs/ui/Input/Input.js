import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import MaterialTextField from 'material-ui/TextField';

export default class Input extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const {
      children,
      className,
      ...props,
    } = this.props;

    console.log(className);

    const classes = classnames("input", className);
    return(
      <MaterialTextField
        className={ classes }
        {...props}
      >{ children }</MaterialTextField>
    );
  }
}