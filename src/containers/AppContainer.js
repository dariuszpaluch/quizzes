import './app_container.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import { MuiThemeProvider } from 'material-ui/styles/index';

import { createMuiTheme } from 'material-ui/styles';

import colors from 'styles/colors.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.primaryLight,
      main: colors.primaryMain,
      dark: colors.primaryDark,
      contrastText: colors.primaryText
    },
    secondary: {
      light: colors.secondaryLight,
      main: colors.secondaryMain,
      dark: colors.secondaryDark,
      contrastText: colors.secondaryText
    }
  }
});

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}
