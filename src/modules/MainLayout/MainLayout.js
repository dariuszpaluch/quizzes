import './main_layout.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'libs/ui/IconButton/IconButton';

import Menu from './components/Menu';
import icons from 'consts/icons';
import { injectIntl } from 'react-intl';
import messages from 'modules/MainLayout/consts/messages';
import paths from 'consts/paths';
import { pagesTitles } from 'utils/globalMessages';

const buttonPropTypes = PropTypes.shape({
  icon: PropTypes.string,
  onClick: PropTypes.func,
});

class MainLayout extends Component {
  static propTypes = {
    showAppBar: PropTypes.bool,
    appBarTittle: PropTypes.string,

    appBarButtons: PropTypes.shape({
      left: buttonPropTypes,
      right: buttonPropTypes,
    })
  };

  static defaultProps = {
    showAppBar: true,
    appBarTittle: 'Quizzes',
  };

  state = {
    mobileOpen: false,
  };

  constructor(props) {
    super(props);

    const intl = props.intl;

    this.navsMenu = [
      {
        label: intl.formatMessage(pagesTitles.TESTS_RESULTS),
        icon: icons.tests_results,
        path: paths.TESTS_RESULTS,
        disabled: true,
      },
      {
        label: intl.formatMessage(pagesTitles.YOUR_TESTS),
        icon: icons.tests,
        path: paths.TESTS,
      },
      {
        label: intl.formatMessage(pagesTitles.YOUR_QUESTIONS),
        icon: icons.questions,
        path: paths.QUESTIONS,
      },
      {
        label: intl.formatMessage(pagesTitles.SETTINGS),
        icon: icons.settings,
        path: paths.SETTINGS,
        disabled: true,
      }
    ];
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderAppBar() {
    const { showAppBar, appBarTittle, appBarButtons } = this.props;

    if (!showAppBar)
      return null;

    const leftButton = appBarButtons && appBarButtons.left;
    const rightButton = appBarButtons && appBarButtons.right;

    return (
      <AppBar className='app-bar'>
        <Toolbar className="toolbar">
          <div className="left-content">
            <IconButton
              color="inherit"
              onClick={leftButton ? leftButton.onClick : this.handleDrawerToggle}
              icon={leftButton ? leftButton.icon : icons.MENU}
              className="nav-icon"
            />
            <div className="page-tittle">{appBarTittle}</div>
          </div>
          {rightButton ?
            <IconButton
              color="inherit"
              onClick={rightButton.onClick}
              className="nav-icon"
              icon={rightButton.icon}
              iconSize={20}
            /> : null}
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    const { children,intl } = this.props;

    return (
      <div className="main-layout">
        {this.renderAppBar()}
        <Menu
          mobileOpen={this.state.mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          items={this.navsMenu}
          title={intl.formatMessage(messages.DRAWER_MENU_HEADER_TITLE)}
        />
        <main className="content">
          <div/>
          {children}
        </main>
      </div>
    );
  }
}

export default injectIntl(MainLayout);
