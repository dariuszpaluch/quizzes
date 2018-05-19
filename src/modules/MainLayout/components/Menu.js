import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';

import Icon from 'material-ui/Icon';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import IconButton from 'libs/ui/IconButton/IconButton';
import icons from 'consts/icons';
import noop from 'lodash/noop';
import Avatar from 'libs/ui/Avatar/Avatar';
import UserMenu from 'modules/MainLayout/components/UserMenu/UserMenu';

export default class Menu extends Component {
  static propTypes = {
    mobileOpen: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
        path: PropTypes.string
      })
    ),
    title: PropTypes.string
  };

  static defaultProps = {
    mobileOpen: false,
    items: [],
    handleDrawerToggle: null
  };

  closeMenuAfterClick = action => () => {
    const { handleDrawerToggle } = this.props;

    action && action();
    handleDrawerToggle && handleDrawerToggle();
  };

  renderMenuItems(isMobile) {
    const { path, items, handleDrawerToggle } = this.props;

    return items.map((item, index) => {
      const active = item.path === path;

      let onClick = item.onClick;
      if (isMobile) {
        onClick = active ? handleDrawerToggle : this.closeMenuAfterClick(item.onClick);
      } else {
        onClick = active ? noop : item.onClick;
      }

      const content = (
        <ListItem
          key={index}
          className={classnames('menu-list-item', {
            active
          })}
          button
          disabled={item.disabled}
          onClick={onClick}
        >
          {item.icon && (
            <ListItemIcon>
              <Icon>{item.icon}</Icon>
            </ListItemIcon>
          )}
          <ListItemText inset primary={item.label} />
        </ListItem>
      );

      return item.path && !item.disabled ? (
        <Link to={item.path} key={index}>
          {content}
        </Link>
      ) : (
        <span key={index}>{content}</span>
      );
    });
  }

  renderMenuContent(isMobile) {
    const { handleDrawerToggle, title,  userData, } = this.props;

    return [
      isMobile ? (
        <IconButton
          key="nav-close-icon"
          className="nav-close-icon"
          icon={icons.CLOSE}
          onClick={handleDrawerToggle}
          iconSize={25}
        />
      ) : null,
      userData.email && <UserMenu key="user-menu"  userData={ userData} />,
      <List
        key="nav-list"
        component="nav"
        subheader={<ListSubheader component="div" className="nav-header-title" />}
      >
        {this.renderMenuItems(isMobile)}
      </List>
    ];
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
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {this.renderMenuContent(true)}
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
    ];
  }
}
