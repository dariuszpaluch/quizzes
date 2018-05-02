import './main_layout.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'libs/ui/IconButton/IconButton';

import Menu from './components/Menu';
import icons from 'consts/icons';
import { injectIntl } from 'react-intl';
import paths from 'consts/paths';
import globalMessages, { pagesTitles } from 'utils/globalMessages';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'modules/Auth/actions';
import messages from 'modules/MainLayout/consts/messages';
import { Input } from 'material-ui';
import * as ReactDOM from 'react-dom';
import AppBarSearch from 'modules/MainLayout/components/AppBarSearch/AppBarSearch';

const buttonPropTypes = PropTypes.shape({
  icon: PropTypes.string,
  onClick: PropTypes.func
});

class MainLayout extends Component {
  static propTypes = {
    showAppBar: PropTypes.bool,
    appBarTittle: PropTypes.string,

    appBarButtons: PropTypes.shape({
      left: buttonPropTypes,
      right: buttonPropTypes
    }),
    hideMenu: PropTypes.bool,
    onSearch: PropTypes.func
  };

  static defaultProps = {
    showAppBar: true,
    appBarTittle: 'Quizzes',
    hideMenu: false,
    onSearch: undefined
  };

  constructor(props) {
    super(props);

    const intl = props.intl;

    this.state = {
      mobileOpen: false,
      expandSearch: false
    };

    this.navsMenu = [
      {
        label: intl.formatMessage(pagesTitles.TESTS_RESULTS),
        icon: icons.tests_results,
        path: paths.TESTS_RESULTS,
        disabled: true
      },
      {
        label: intl.formatMessage(pagesTitles.YOUR_TESTS),
        icon: icons.tests,
        path: paths.TESTS
      },
      {
        label: intl.formatMessage(pagesTitles.YOUR_QUESTIONS),
        icon: icons.questions,
        path: paths.QUESTIONS
      },
      {
        label: intl.formatMessage(pagesTitles.SETTINGS),
        icon: icons.settings,
        path: paths.SETTINGS,
        disabled: true
      },
      {
        label: intl.formatMessage(globalMessages.LOGOUT),
        icon: icons.logout,
        onClick: this.logout
      }
    ];
  }

  logout = () => {
    const { history } = this.props;

    history.push(paths.INDEX);
  };

  handleDrawerToggle = () => {
    this.setState((prevState, prevProps) => ({
      mobileOpen: !prevState.mobileOpen
    }));
  };

  renderRightAppBarAction() {
    const { appBarButtons, onSearch } = this.props;
    const rightButton = appBarButtons && appBarButtons.right;

    if (onSearch) {
      return <AppBarSearch onChange={onSearch} />;
    }

    if (rightButton)
      return (
        <IconButton
          color="inherit"
          onClick={rightButton.onClick}
          className="nav-icon"
          icon={rightButton.icon}
          iconSize={20}
        />
      );
  }

  renderAppBar() {
    const { showAppBar, appBarTittle, appBarButtons, hideMenu } = this.props;

    if (!showAppBar) return null;

    const leftButton = appBarButtons && appBarButtons.left;

    const showLeftButton = !hideMenu || leftButton;

    return (
      <AppBar
        className={classnames('app-bar', {
          'without-left-button': !showLeftButton
        })}
      >
        <Toolbar className="toolbar">
          <div className="left-content">
            {showLeftButton ? (
              <IconButton
                classname={classnames({
                  'nav-icon': !leftButton
                })}
                color="inherit"
                onClick={
                  leftButton ? leftButton.onClick : this.handleDrawerToggle
                }
                icon={leftButton ? leftButton.icon : icons.MENU}
              />
            ) : null}
            <div className="page-tittle">{appBarTittle}</div>
          </div>
          {this.renderRightAppBarAction()}
        </Toolbar>
      </AppBar>
    );
  }

  renderMenu() {
    const { intl, location } = this.props;

    return (
      <Menu
        mobileOpen={this.state.mobileOpen}
        handleDrawerToggle={this.handleDrawerToggle}
        items={this.navsMenu}
        title={intl.formatMessage(messages.DRAWER_MENU_HEADER_TITLE)}
        path={location.pathname}
      />
    );
  }

  render() {
    const { children, hideMenu } = this.props;

    return (
      <div className="main-layout">
        {this.renderAppBar()}
        {!hideMenu && this.renderMenu()}
        <main className="content">{children}</main>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(null, mapDispatchToProps)(injectIntl(MainLayout))
);
