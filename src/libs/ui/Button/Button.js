import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import MaterialButton from 'material-ui/Button';

export default class Button extends Component {

  render() {
    const {
      children,
      ...props,
    } = this.props;

    return(
      <MaterialButton {...props}>{ children }</MaterialButton>
    );
  }
}