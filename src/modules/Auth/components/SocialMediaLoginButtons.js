import './social_media_login_buttons.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Button from 'libs/ui/Button/Button';

export default class SocialMediaLoginButtons extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const returnUrl = window.document.location.href + location.search;

    return (
      <div className="social-media-buttons">
        <a
          key="facebook"
          href={`https://localhost:3000/auth/facebook?returnUrl=${encodeURIComponent(
            returnUrl
          )}`}
        >
          <Button className="social-login login-facebook">
            Login with Facebook
          </Button>
        </a>
        <a
          key="google"
          href={`https://localhost:3000/auth/google?returnUrl=${encodeURIComponent(
            returnUrl
          )}`}
        >
          <Button className="social-login login-google">
            Login with Google
          </Button>
        </a>
        <a
          key="github"
          href={`https://localhost:3000/auth/github?returnUrl=${encodeURIComponent(
            returnUrl
          )}`}
        >
          <Button className="social-login login-github">
            Login with Github
          </Button>
        </a>
      </div>
    );
  }
}
