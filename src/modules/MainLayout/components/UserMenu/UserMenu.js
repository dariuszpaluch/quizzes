import './user_menu.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Avatar from 'libs/ui/Avatar/Avatar';
import avatarMenPlaceholder from 'assets/avatar-men-placeholder.jpg';
import Rocket from 'components/Rocket/Rocket';

export default class UserMenu extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { userData } = this.props;

    return (
      <div className="user-menu">
        <div className="rocket-background">
          <Rocket />
        </div>
        <Avatar
          className="user-avatar"
          alt="Remy Sharp"
          src={userData.avatarUrl || avatarMenPlaceholder}
          size={80}
        />
        <div className="user-details">
          <p>{`${userData.firstName} ${userData.lastName}`}</p>
          <p>{userData.email}</p>
        </div>
      </div>
    );
  }
}
