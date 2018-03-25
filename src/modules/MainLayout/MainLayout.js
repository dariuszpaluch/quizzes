import './main_layout.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Menu from './Menu';
import navsMenu from './consts/navsMenu';
import Icon from 'libs/ui/Icon/Icon';

class MainLayout extends Component {
  static propTypes = {
    showAppBar: PropTypes.bool,
    appBarTittle: PropTypes.string,
    customAppBarButton: PropTypes.shape({
      icon: PropTypes.string,
      onClick: PropTypes.func,
    })
  };

  static defaultProps = {
    showAppBar: true,
    appBarTittle: '',
  };

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderAppBar() {
    const { showAppBar, appBarTittle, customAppBarButton } = this.props;

    if (!showAppBar)
      return null;

    console.log(customAppBarButton);

    return (
      <AppBar className='app-bar'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={customAppBarButton ? customAppBarButton.onClick : this.handleDrawerToggle}
            className="nav-icon"
          >
            {customAppBarButton ? <Icon bold icon={customAppBarButton.icon}/> : <MenuIcon/>}
          </IconButton>
          <h2>{appBarTittle}</h2>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    const { children } = this.props;

    return (
      <div className="main-layout">
        {this.renderAppBar()}
        <Menu
          mobileOpen={this.state.mobileOpen}
          handleDrawerToggle={this.handleDrawerToggle}
          items={navsMenu}
        />
        <main className="content">
          <div/>
          {children}
        </main>
      </div>
    );
  }
}

export default MainLayout;
