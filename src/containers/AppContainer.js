import './app_container.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const { children } = this.props;

    return (
      <div className="app-container">
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        {children}
      </div>
    );
  }
}
