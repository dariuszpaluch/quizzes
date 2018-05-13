import './user_menu.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Avatar from 'libs/ui/Avatar/Avatar';
import Typography from 'libs/ui/Typography/Typography';

export default class UserMenu extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="user-menu">
        <div
          className="user-avatar-background"
          style={{
            // backgroundImage: `url(https://avatars1.githubusercontent.com/u/15227876?s=460&v=4)`,
            backgroundSize: 'cover'
          }}
        />

        <Avatar
          className="user-avatar"
          alt="Remy Sharp"
          src="https://avatars1.githubusercontent.com/u/15227876?s=460&v=4"
          size={80}
        />

        <div className="user-details">
          <p>Dariusz Paluch</p>
          <p>dariusz@dariuszpaluch.com</p>
        </div>
      </div>
    );
  }
}
