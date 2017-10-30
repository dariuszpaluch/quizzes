import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';
import MaterialCard from 'material-ui/Card';

export default class Card extends Component {
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
      ...props,
    } = this.props;

    return(
      <MaterialCard {...props}>{ children }</MaterialCard>
    );
  }
}