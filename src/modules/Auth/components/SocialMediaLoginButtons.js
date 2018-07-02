import './social_media_login_buttons.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Button from 'libs/ui/Button/Button';
import { API_URL } from 'settings';

export default class SocialMediaLoginButtons extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.returnUrl = window.document.location.href + location.search;
  }

  render() {
    return (
      <div className="social-media-buttons">
        <a
          key="facebook"
          href={`${API_URL}/auth/facebook?returnUrl=${encodeURIComponent(this.returnUrl)}`}
        >
          <Button className="social-login login-facebook">Login with Facebook</Button>
        </a>
        <a
          key="google"
          href={`${API_URL}/auth/google?returnUrl=${encodeURIComponent(this.returnUrl)}`}
        >
          <Button className="social-login login-google">Login with Google</Button>
        </a>
        <a
          key="github"
          href={`${API_URL}/auth/github?returnUrl=${encodeURIComponent(this.returnUrl)}`}
        >
          <Button className="social-login login-github">Login with Github</Button>
        </a>
      </div>
    );
  }
}
