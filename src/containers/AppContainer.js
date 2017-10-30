import './app_container.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const {
      children
    } = this.props;

    return(
      <div className="app-container">
        { children }
      </div>
    );
  }
}