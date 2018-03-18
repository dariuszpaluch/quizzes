import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';

import Icon from 'material-ui/Icon';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default class Menu extends Component {
  static propTypes = {
    mobileOpen: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      path: PropTypes.string,
    }))
  };

  static defaultProps = {
    mobileOpen: false,
    items: [],
    handleDrawerToggle: null,
  };

  renderMenuItems() {
    return this.props.items.map((item, index) => {
      const content = (
        <ListItem button disabled={item.disabled}>
          {item.icon && <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>}
          <ListItemText inset primary={item.label}/>
        </ListItem>
      );

      return item.path && !item.disabled ?
        <Link to={item.path} key={index}>{content}</Link>
        : <span key={index}>{content}</span>
    });
  }

  renderMenuContent() {
    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Menu</ListSubheader>}
      >
        {this.renderMenuItems()}
      </List>
    );
  }

  render() {
    const { mobileOpen, handleDrawerToggle } = this.props;
    return [
      <Drawer
        key="mobile-menu-drawer"
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className={classnames('menu-drawer', 'mobile-drawer')}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {this.renderMenuContent()}
      </Drawer>,
      handleDrawerToggle && (
        <Drawer
          key="menu-drawer"
          className={classnames('menu-drawer', 'permament-drawer')}
          variant="permanent"
          anchor="left"
          open
        >
          {this.renderMenuContent()}
        </Drawer>
      )
    ]
  }
}
