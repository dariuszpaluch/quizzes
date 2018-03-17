import './main_layout.scss';

import React, { Component } from 'react';
import classnames from 'classnames';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  // appBar: {
  //   position: 'absolute',
  //   marginLeft: drawerWidth,
  //   [theme.breakpoints.up('md')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //   },
  // },
  // navIconHide: {
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  // },
  // toolbar: theme.mixins.toolbar,
  // drawerPaper: {
  //   width: drawerWidth,
  //   [theme.breakpoints.up('md')]: {
  //     position: 'relative',
  //   },
  // },
  // content: {
  //   flexGrow: 1,
  //   backgroundColor: theme.palette.background.default,
  //   padding: theme.spacing.unit * 3,
  // },
});

//

class MainLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderDrawerContent() {
    return (
      <div className="menu-drawer-content">
        <div/>
        <Divider/>
        darek
        {/*<List>{mailFolderListItems}</List>*/}
        <Divider/>
        {/*<List>{otherMailFolderListItems}</List>*/}
      </div>
    );
  }


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
        <Drawer
          variant="temporary"
          anchor="left"
          open={this.state.mobileOpen}
          onClose={this.handleDrawerToggle}
          className={classnames('menu-drawer', 'mobile-drawer')}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {this.renderDrawerContent()}
        </Drawer>
          <Drawer
            className={classnames("menu-drawer", "permament-drawer")}
            variant="permanent"
            anchor="left"
            open
          >
            {this.renderDrawerContent()}
          </Drawer>
        <main className="content">
          <div/>
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainLayout);
