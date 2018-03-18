import './main_layout.scss';

import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Menu from './Menu';
import navsMenu from './consts/navsMenu';

class MainLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { children } = this.props;

    return (
      <div className="main-layout">
        <AppBar className='app-bar'>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className="nav-icon"
            >
              <MenuIcon/>
            </IconButton>
            <h2>Quizess</h2>
          </Toolbar>
        </AppBar>
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
